import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';

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

      if (!error) {
        setComments(data);
      }
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
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Head>
        <title>À propos — Ange Répond</title>
      </Head>

      <Header />

      <main className="max-w-3xl mx-auto p-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-6">🌟 À propos de ce site</h1>

        <p className="text-lg mb-4">
          Ce site a été créé avec amour et foi pour offrir un espace de paix, de guidance et de connexion spirituelle.
        </p>

        <blockquote className="italic text-blue-800 border-l-4 border-blue-400 pl-4 my-4">
          « Demandez, et l’on vous donnera ; cherchez, et vous trouverez ; frappez, et l’on vous ouvrira. »  
          <br /> — Matthieu 7:7
        </blockquote>

        <p className="text-md text-gray-700 mb-6">
          Vous avez droit à une question gratuite. Chaque réponse est donnée avec douceur et lumière.  
          Ensuite, vous pouvez débloquer un pack de 7 questions pour 1 €.
        </p>

        <div className="flex justify-center gap-4 mb-10">
          <Link href="/" className="text-pink-600 underline">🏠 Accueil</Link>
          <Link href="/ask" className="text-blue-600 underline">🙋‍♂ Poser une question</Link>
        </div>

        {/* SECTION COMMENTAIRES */}
        <div className="bg-gray-100 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">💬 Témoignages anonymes</h2>

          <div className="space-y-4 max-h-60 overflow-y-auto mb-4 text-left text-sm">
            {comments.length === 0 ? (
              <p className="text-gray-500">Aucun commentaire pour le moment. Sois le premier à partager 💖</p>
            ) : (
              comments.map((c, idx) => (
                <div key={idx} className="bg-white p-3 rounded border shadow-sm">
                  <p className="text-gray-700">{c.text}</p>
                  <p className="text-right text-xs text-gray-500 mt-1">
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
            className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-500 mb-3"
          />

          <button
            onClick={handleAddComment}
            disabled={loading}
            className="px-5 py-2 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-400 transition"
          >
            {loading ? 'Envoi en cours...' : 'Partager'}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
