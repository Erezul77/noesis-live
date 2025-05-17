'use client'

import { useState } from 'react'
import { submitReflection } from '../../lib/submit'
import { Loader2 } from 'lucide-react'

export default function ReflectPage() {
  const [reflection, setReflection] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!reflection.trim()) return
    setLoading(true)
    try {
      await submitReflection(reflection)
      setSubmitted(true)
      setReflection('')
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white text-black p-6">
      <div className="max-w-xl w-full space-y-6 text-center">
        <h1 className="text-3xl font-semibold">Reflect</h1>
        <p className="text-gray-600">Enter your thoughts, intuitions, or insights below.</p>

        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="What are you reflecting on?"
          className="w-full h-48 p-4 border border-gray-300 rounded-xl shadow-sm resize-none focus:outline-none focus:ring focus:ring-black/20 transition"
        />

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={loading || submitted}
            className={`px-6 py-2 rounded-full text-white bg-black hover:bg-gray-900 transition ${
              loading || submitted ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : submitted ? (
              'Reflection Submitted ✔'
            ) : (
              'Submit Reflection'
            )}
          </button>
        </div>
      </div>
    </main>
  )
}
