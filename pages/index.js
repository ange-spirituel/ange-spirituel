import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const audio = new Audio('/432hz.mp3');
    audio.volume = 0.3;

    const handleClick = () => {
      audio.play().catch(() => {});
      document.removeEventListener('click', handleClick);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
      audio.pause();
    };
  }, []);

  return (
    <div
      className="min-h-screen text-white flex flex-col justify-between animate-fade-in bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/celestial.jpg')" }}
    >
      <Head>
        <title>✨ Ange Répond ✨</title>
        <meta name="description" content="Posez votre question à votre guide spirituel céleste." />
      </Head>

      <Header />

      <main className="flex flex-col items-center justify-center text-center px-6 py-16 space-y-8">
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-3xl w-full animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-300 drop-shadow-xl mb-4 animate-fade-in">
            👼 Bienvenue sur <span className="text-white">Ange Répond</span>
          </h1>

          <img
            src="https://cdn.pixabay.com/photo/2017/01/16/19/40/angel-1982307_1280.png"
            alt="Ange Céleste"
            className="w-48 h-48 mx-auto mb-6 drop-shadow-xl animate-float"
          />

          <p className="text-lg md:text-xl text-purple-100 leading-relaxed animate-fade-in">
            Les anges nous parlent, mais souvent en silence,
            Ils cherchent par tous les moyens pour nous passer des messages.<br />
            Ce site est une porte douce vers leurs messages. 🌌<br />
            Avant de poser ta question, respire profondément. 
            Adresse-toi à Dieu, ton ange gardien, à ton guide spirituel ou à l’univers.
            <br /><br />
            Lorsque tu poses une question à l'Ange, pose-la avec foi, amour et confiance.
            <br />
            <strong className="block mt-4 animate-pulse">1 € = 7 questions</strong>
          </p>

          <div className="mt-8 space-y-4">
            <Link href="/ask">
              <span className="inline-block bg-yellow-300 text-indigo-900 font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 hover:bg-yellow-200 transition-transform duration-300">
                ✨ Poser une question à l’Ange
              </span>
            </Link>

            <Link href="/about">
              <p className="text-sm text-yellow-200 underline hover:text-yellow-300 transition-opacity duration-200">
                En savoir plus sur ce sanctuaire spirituel
              </p>
            </Link>
          </div>

          {/* Signature */}
          <div className="text-center mt-8 text-yellow-100 font-signature text-xl animate-fade-in">
    Oriane OYONO -
     
    Paix et bénédictions sur toi, que la lumière t’accompagne toujours ✨
</div>
        </div>
      </main>

    <Footer />
    </div>
  );
}
