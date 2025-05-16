export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black px-6 py-16 space-y-12 max-w-4xl mx-auto">
      <section className="text-center">
        <h1 className="text-4xl font-bold">🧠 What is Noesis?</h1>
        <p className="mt-4 text-lg text-gray-700">
          Noesis is a decentralized mirror of thought.
          It lets anyone anchor a moment of insight to the blockchain—immutable, anonymous, open.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">🔗 How It Works</h2>
        <ol className="space-y-2 text-gray-800 list-decimal list-inside">
          <li>You submit a reflection (text only)</li>
          <li>It’s uploaded to IPFS using Web3.Storage</li>
          <li>The CID is recorded on-chain via ReflectionVault (Ethereum)</li>
          <li>The live feed listens to events and shows them in real-time</li>
        </ol>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">🧰 Tech Stack</h2>
        <ul className="grid grid-cols-2 gap-2 text-gray-800">
          <li>Next.js 14 (App Router)</li>
          <li>Web3.Storage (W3UP client)</li>
          <li>Ethereum Sepolia</li>
          <li>ReflectionVault smart contract</li>
          <li>Alchemy SDK (event listener)</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">🔮 Roadmap</h2>
        <ul className="space-y-1 text-gray-800">
          <li>✅ Reflection engine via IPFS + Ethereum</li>
          <li>🗳 DAO proposal system (Q3 2025)</li>
          <li>🧠 Swarm mind protocol (Q4 2025)</li>
          <li>🫥 Anonymous reflection nodes (2026+)</li>
          <li>🧬 Knowledge evolution engine (Long-term)</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">📥 Download PDF</h2>
        <p className="text-gray-700">
          View the full one-page explainer:&nbsp;
          <a href="/Noesis_Launch_Explainer_Clean.pdf" className="underline text-blue-600" target="_blank">
            Noesis Launch Explainer
          </a>
        </p>
      </section>
    </main>
  )
}