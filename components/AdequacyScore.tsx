export default function AdequacyScore({ score }: { score: number }) {
  const percentage = Math.round(score * 100);
  const radius = 22;
  const stroke = 4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score);

  return (
    <div className="flex items-center space-x-2">
      <svg width="50" height="50" viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r={radius}
          stroke="#222"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx="25"
          cy="25"
          r={radius}
          stroke={score > 0.7 ? "#34D399" : "#FBBF24"}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 25 25)"
        />
      </svg>
      <span className="text-white/80 text-sm">{percentage}%</span>
    </div>
  );
}