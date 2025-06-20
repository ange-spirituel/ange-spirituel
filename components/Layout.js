import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 via-white to-blue-100 text-gray-900 font-serif">
      <header className="bg-white bg-opacity-70 shadow-md py-4">
        <nav className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 px-4 text-center">
          <h1 className="text-2xl font-bold text-pink-700 drop-shadow-md">👼 Ange Répond</h1>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
            <Link href="/" className="text-blue-800 hover:underline drop-shadow-sm">Accueil</Link>
            <Link href="/ask" className="text-blue-800 hover:underline drop-shadow-sm">Poser une question</Link>
            <Link href="/a-propos" className="text-blue-800 hover:underline drop-shadow-sm">À propos</Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow px-4 py-10">{children}</main>

      <footer className="bg-white bg-opacity-60 text-center text-sm py-4 mt-10 px-4 text-gray-800 drop-shadow-sm">
        ✨ Que la lumière de ton ange te guide, toujours. — Ce site est sacré 💫
      </footer>
    </div>
  );
}
