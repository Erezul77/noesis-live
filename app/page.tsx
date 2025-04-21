import OctopusCreature from '@/components/OctopusCreature'

export default function Home() {
  return (
    <main className="relative h-screen bg-black text-white">
      <OctopusCreature />
      <div className="text-center pt-40">
        <h1 className="text-5xl font-bold">🐙 Welcome to Noēsis</h1>
        <p className="mt-4 text-lg">Decentralized Evolving Intelligence</p>
      </div>
    </main>
  )
}
