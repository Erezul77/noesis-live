export async function submitReflection(text: string) {
    const res = await fetch('/api/reflect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
  
    if (!res.ok) {
      const msg = await res.text()
      throw new Error('Submission failed: ' + msg)
    }
  }
  