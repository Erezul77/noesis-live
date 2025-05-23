import { parseReflectionToGraph, computeAdequacy } from './adequacy';
import { PHI_GRAPH } from './phi';

let lastAdequacy: number | null = null;

export async function submitReflection(text: string) {
  const graph = parseReflectionToGraph(text);
  const adequacy = computeAdequacy(graph, PHI_GRAPH);
  const joy = lastAdequacy != null ? adequacy - lastAdequacy : null;
  lastAdequacy = adequacy;

  const metadata = {
    reflection: text,
    timestamp: new Date().toISOString(),
    adequacy: Number(adequacy.toFixed(4)),
    joy: joy !== null ? Number(joy.toFixed(4)) : null
  };

  const cid = await uploadToIPFS(metadata);
  console.log('CID:', cid, 'Adequacy:', adequacy, 'Joy:', joy);
  await contract.submitReflection(cid); // adjust to match your contract
}