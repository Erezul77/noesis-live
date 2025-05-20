import { useReflections } from '@/lib/useReflections'

export default function FeedPage() {
  const { reflections, loading } = useReflections()

  return (
    <main className="min-h-screen p-10 max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">🔄 Live Reflection Feed</h1>
      {loading && <p className="text-gray-500">Loading reflections...</p>}
      {!loading && reflections.length === 0 && (
        <p className="text-gray-500">No reflections found yet.</p>
      )}
      <div className="mt-6 space-y-6">
        {reflections.map((r, i) => (
          <div key={i} className="bg-white shadow-md p-4 rounded text-left">
            <p className="text-sm text-gray-400 mb-2">
              {new Date(r.timestamp * 1000).toLocaleString()} — {r.address.slice(0, 6)}...{r.address.slice(-4)}
            </p>
            <p className="text-lg whitespace-pre-line">{r.text}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
