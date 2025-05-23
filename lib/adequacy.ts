export type Edge = [string, string];
export type Graph = Edge[];

export function parseReflectionToGraph(text: string): Graph {
  const regex = /([a-zA-Z]+)\s+(causes|leads to|produces|explains|triggers)\s+([a-zA-Z]+)/gi;
  const matches = [...text.matchAll(regex)];
  return matches.map(([, from, , to]) => [from.toLowerCase(), to.toLowerCase()]);
}

export function computeAdequacy(GI: Graph, Phi: Graph): number {
  const intersection = GI.filter(e => Phi.some(p => p[0] === e[0] && p[1] === e[1]));
  const distortion = GI.filter(e => !Phi.some(p => p[0] === e[0] && p[1] === e[1]));

  const alignmentScore = intersection.length / Math.max(Phi.length, 1);
  const distortionScore = distortion.length / Math.max(GI.length, 1);

  const adequacy = alignmentScore - distortionScore;
  return Math.max(0, Math.min(1, adequacy)); // clamp to [0, 1]
}