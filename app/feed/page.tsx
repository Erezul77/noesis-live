'use client'
import { useReflections } from '@/lib/useReflections'

export default function FeedPage() {
  const contractAddress = '0x437c332495a8ef52e00ca721f9cF26Dc81B0aC3D'
// If useReflections returns only string[], do this:
const reflections = useReflections(contractAddress) as string[];
const loading = false; // or set loading appropriately if available

// If useReflections should return [string[], boolean], update its implementation instead.

  return (
    <main className="min-h-screen p-10 max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">🔄 Live Reflection Feed</h1>

      {reflections.length === 0 ? (
        <p className="text-gray-600">No reflections found.</p>
      ) : (
        <div className="space-y-6 mt-6">
          {reflections.map((r, i) => (
            <div key={i} className="p-4 border rounded-lg shadow text-left">
              <p className="text-lg whitespace-pre-line">{r}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
