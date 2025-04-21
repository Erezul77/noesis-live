'use client'

import { useReflections } from '@/hooks/useReflections'
import { formatDistanceToNow } from 'date-fns'

export default function FeedPage() {
  const { reflections, loading } = useReflections()

  return (
    <div className="min-h-screen px-6 py-12 bg-black text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">🌀 Collective Reflections</h1>

      {loading ? (
        <div className="text-center mt-20 animate-pulse text-gray-400">⏳ Loading reflections from chain...</div>
      ) : reflections.length === 0 ? (
        <div className="text-center mt-20 text-gray-500">No reflections found yet. Be the first to reflect!</div>
      ) : (
        <ul className="space-y-6 max-w-3xl mx-auto">
          {reflections.map((r, idx) => (
            <li
              key={idx}
              className="bg-zinc-900/60 backdrop-blur p-6 rounded-xl border border-white/10 shadow-md"
            >
              <div className="text-gray-300 mb-2 text-sm">
                {formatDistanceToNow(new Date(r.timestamp * 1000), { addSuffix: true })}
              </div>
              <div className="text-lg leading-relaxed text-white whitespace-pre-wrap">{r.text}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
