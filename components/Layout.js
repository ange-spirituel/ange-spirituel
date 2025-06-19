// components/Layout.js
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 via-white to-blue-100 text-gray-800 font-serif">
      <header className="bg-white bg-opacity-70 shadow-md py-4">
        <nav className="max-w-4xl mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold text-pink-700">👼 Ange Répond</h1>
          <div className="space-x-4">
            <Link href="/" className="text-blue-600 hover:underline">Accueil</Link>
            <Link href="/ask" className="text-blue-600 hover:underline">Poser une question</Link>
            <Link href="/a-propos" className="text-blue-600 hover:underline">À propos</Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow px-4 py-10">{children}</main>

      <footer className="bg-white bg-opacity-60 text-center text-sm py-4 mt-10">
        ✨ Que la lumière de ton ange te guide, toujours. — Ce site est sacré 💫
      </footer>
    </div>
  );
}
