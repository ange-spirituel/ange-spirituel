import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '../lib/supabase';

export default function APropos() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) setComments(data);
    };

    fetchComments();
  }, []);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      setLoading(true);
      const { data, error } = await supabase
        .from('comments')
        .insert([{ text: newComment }]);

      if (!error) {
        setComments([data[0], ...comments]);
        setNewComment('');
      }

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-white text-gray-800 font-serif">
      <Head>
        <title>À propos — Ange Répond</title>
      </Head>

      {/* Header simple sans fond étoilé */}
      <header className="w-full py-4 shadow-md bg-white">
        <nav className="max-w-4xl mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold text-pink-700">👼 Ange Répond</h1>
          <div className="space-x-4">
            <Link href="/" className="text-blue-600 hover:underline">Accueil</Link>
            <Link href="/ask" className="text-blue-600 hover:underline">Poser une question</Link>
            <Link href="/a-propos" className="text-blue-600 hover:underline">À propos</Link>
          </div>
        </nav>
      </header>

      {/* Contenu principal */}
      <main className="max-w-3xl w-full px-6 py-12 text-center">
        <h2 className="text-3xl font-bold text-pink-600 mb-4">🌟 À propos de ce site</h2>
        <p className="text-gray-700 mb-6">
          Ce site a été créé avec amour et foi pour offrir un espace de paix, de guidance et de connexion spirituelle.
          Il invite chacun à se recentrer, à se connecter à ses guides, à Dieu, ou à son Ange gardien.
        </p>

        <blockquote className="italic text-blue-800 border-l-4 border-blue-400 pl-4 mb-6">
          « Demandez, et l’on vous donnera ; cherchez, et vous trouverez ; frappez, et l’on vous ouvrira. »<br />
          — Matthieu 7:7
        </blockquote>

        <p className="text-gray-600 mb-10">
          Vous avez droit à une question gratuite. Chaque réponse est donnée avec douceur et lumière.
          Ensuite, pour continuer, vous pouvez faire un don ou débloquer un pack de 7 questions pour 1 €.
        </p>

        {/* Commentaires */}
        <div className="bg-gray-100 p-6 rounded-xl shadow-inner">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">💬 Témoignages anonymes</h3>

          <div className="space-y-4 max-h-60 overflow-y-auto mb-4 text-left text-sm">
            {comments.length === 0 ? (
              <p className="text-gray-500">Aucun commentaire pour le moment. Sois le premier à partager 💖</p>
            ) : (
              comments.map((c, idx) => (
                <div key={idx} className="bg-white p-3 rounded shadow text-gray-700">
                  <p>{c.text}</p>
                  <p className="text-right text-xs text-gray-400 mt-1">
                    {new Date(c.created_at).toLocaleString('fr-FR')}
                  </p>
                </div>
              ))
            )}
          </div>

          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            placeholder="Laisse un mot doux ou un témoignage anonyme..."
            className="w-full p-3 rounded border border-gray-300 mb-3 bg-white text-gray-800"
          />

          <button
            onClick={handleAddComment}
            disabled={loading}
            className="px-5 py-2 bg-pink-500 hover:bg-pink-400 text-white font-semibold rounded"
          >
            {loading ? 'Envoi...' : 'Partager'}
          </button>
        </div>
      </main>

      {/* Footer simple */}
      <footer className="w-full text-center py-4 text-sm text-gray-500 bg-white mt-10">
        ✨ Que la lumière de ton ange te guide, toujours. — Ce site est sacré 💫
      </footer>
    </div>
  );
}
