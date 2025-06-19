// pages/a-propos.js
import Link from 'next/link';

export default function APropos() {
  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white bg-opacity-90 rounded-xl shadow-lg text-center space-y-6">
      <h1 className="text-3xl font-bold text-pink-600">🌟 À propos de ce site</h1>

      <p className="text-gray-700">
        Ce site a été créé avec amour et foi pour offrir un espace de paix, de guidance et de connexion spirituelle.  
        Il invite chacun à se recentrer, à se connecter à ses guides, à Dieu, ou à son Ange gardien.
      </p>

      <blockquote className="italic text-blue-800 border-l-4 border-blue-400 pl-4">
        « Demandez, et l’on vous donnera ; cherchez, et vous trouverez ; frappez, et l’on vous ouvrira. »  
        <br /> — Matthieu 7:7
      </blockquote>

      <p className="text-gray-600">
        Vous avez droit à une question gratuite. Chaque réponse est donnée avec douceur et lumière.  
        Ensuite, pour continuer, vous pouvez faire un don ou débloquer un pack de 6 questions pour 1 €.
      </p>

      <div className="flex justify-center gap-4 mt-6">
        <Link href="/" className="text-pink-600 underline">🏠 Accueil</Link>
        <Link href="/ask" className="text-blue-600 underline">🙋‍♂️ Poser une question</Link>
      </div>
    </div>
  );
}
