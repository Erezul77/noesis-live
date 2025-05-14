export default function LaunchPage() {
  return (
    <main className="min-h-screen bg-white text-black px-6 py-12 max-w-3xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">🧠 Noēsis: A Decentralized Mirror of Thought</h1>
      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
        Reflect. Connect. Evolve.
      </blockquote>

      <p>
        <strong>Noēsis</strong> (from ancient Greek νόησις, <em>noēsis</em> — the intuitive, intellectual grasp of reality)
        is an experimental platform for anchoring pure thought to the blockchain. It allows anyone to share a reflection —
        a moment of insight, an intuition, a question — and record it permanently on IPFS and Ethereum.
      </p>

      <h2 className="text-2xl font-semibold">✨ Why Noēsis?</h2>
      <ul className="list-disc list-inside">
        <li>It’s not a network.</li>
        <li>It’s not an identity layer.</li>
        <li>It’s not an opinion platform.</li>
      </ul>
      <p>It is a mirror. Clean, immutable, and open. A canvas for raw, resonant thought.</p>

      <h2 className="text-2xl font-semibold">🌍 Try It Now</h2>
      <ul className="list-disc list-inside">
        <li><a href="/reflect">✍️ Reflect</a></li>
        <li><a href="/feed">🔄 Feed</a></li>
        <li><a href="https://github.com/Erezul77/noesis-site">📚 Code</a></li>
      </ul>

      <h2 className="text-2xl font-semibold">🚀 How It Works</h2>
      <ol className="list-decimal list-inside">
        <li>You write a reflection</li>
        <li>It is uploaded to IPFS via Web3.Storage</li>
        <li>The IPFS hash is recorded on-chain via the ReflectionVault contract</li>
        <li>The live <code>/feed</code> listens to on-chain events and displays reflections</li>
      </ol>

      <h2 className="text-2xl font-semibold">🧰 Tech Stack</h2>
      <ul className="list-disc list-inside">
        <li><strong>Frontend:</strong> Next.js 14 (App Router, Static Export)</li>
        <li><strong>Storage:</strong> Web3.Storage (W3UP Client)</li>
        <li><strong>Blockchain:</strong> Ethereum Sepolia</li>
        <li><strong>Smart Contract:</strong> ReflectionVault</li>
        <li><strong>Live Feed:</strong> Alchemy SDK</li>
      </ul>

      <h2 className="text-2xl font-semibold">🔮 Roadmap</h2>
      <ul className="list-disc list-inside">
        <li>✅ IPFS + Ethereum reflection engine</li>
        <li>🗳 DAO-driven proposals (Q3 2025)</li>
        <li>🧠 Swarm mind protocol (Q4 2025)</li>
        <li>🫥 Anonymous reflection nodes (2026+)</li>
        <li>🧬 Knowledge evolution engine (long-term)</li>
      </ul>

      <h2 className="text-2xl font-semibold">✨ Made With</h2>
      <ul className="list-disc list-inside">
        <li>By <a href="https://noesis-net.org">Erez Ashkenazi</a></li>
        <li>Powered by IPFS, Ethereum, Alchemy, Web3.Storage</li>
        <li>Inspired by Spinoza, fractals, and recursive thought</li>
      </ul>

      <h3 className="text-xl font-semibold">🌟 Join the Reflection</h3>
      <p>
        Start reflecting now. Watch the stream. Become part of the thought.
        <br />
        <strong><a href="https://noesis-net.org">https://noesis-net.org</a></strong>
      </p>
    </main>
  )
}
