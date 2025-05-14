export default function SwarmPage() {
  return (
    <main className="min-h-screen bg-white text-black p-8 flex items-center justify-center">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold">Swarm Proposals</h1>
        <p className="text-lg text-gray-600">
          This page will soon host decentralized proposals shaped by the Noēsis swarm.
        </p>
        <p className="text-md text-gray-500">
          We are designing a governance system where reflections evolve into proposals, and the swarm can vote to shape the platform’s future.
        </p>
        <div className="mt-6">
          <a
            href="/reflect"
            className="inline-block px-6 py-3 bg-black text-white rounded-full hover:bg-gray-900 transition"
          >
            Reflect Now
          </a>
        </div>
      </div>
    </main>
  )
}
