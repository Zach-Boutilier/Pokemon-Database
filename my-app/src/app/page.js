import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 text-gray-800 px-4">
      <h1 className="text-5xl font-bold mb-4 text-center">Pokémon Database</h1>

      <nav className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/pokemon"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-400 hover:text-black"
        >
          View All Pokémon
        </Link>
        <Link
          href="/types"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-400 hover:text-black"
        >
          View by Type
        </Link>
        <Link
          href="/search"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-400 hover:text-black"
        >
          Search Pokémon
        </Link>
      </nav>
    </main>
  );
}

