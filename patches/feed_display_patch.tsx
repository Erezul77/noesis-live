{reflection.adequacy != null && (
  <div className="mt-2">
    <AdequacyScore score={reflection.adequacy} />
  </div>
)}
{reflection.joy != null && (
  <p className={`text-sm mt-1 ${reflection.joy > 0 ? 'text-green-400' : 'text-red-400'}`}>
    Joy: {(reflection.joy * 100).toFixed(2)}%
  </p>
)}