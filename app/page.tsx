// app/page.tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12 bg-white text-black">
      <a href="/about" className="block text-center text-blue-600 underline mb-6">
  📘 About Noēsis
</a>
      <div className="max-w-2xl text-center space-y-6">
        <img src="/logo.svg" alt="Noēsis Logo" className="w-32 h-32 mx-auto mb-4" />

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Noēsis
        </h1>
        <p className="text-lg md:text-xl font-light leading-relaxed">
          A decentralized mirror of thought.<br />
          Reflect. Connect. Evolve.
        </p>
        <div className="pt-4">
          <a
            href="/reflect"
            className="inline-block px-6 py-3 text-white bg-black hover:bg-gray-900 transition rounded-full"
          >
            Start Reflecting
          </a>
        </div>
      </div>
    </main>
  );
}
