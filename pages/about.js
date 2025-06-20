import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

export default function AboutPage() {
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
    <div className="min-h-screen flex flex-col justify-between bg-white text-black">
      <Head>
        <title>À propos — Ange Répond</title>
      </Head>

      <Header />

      <main className="max-w-3xl mx-auto p-6 sm:p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">🙏 À propos de ce sanctuaire spirituel</h1>
        <p className="text-lg leading-relaxed mb-8 text-center">
          Ce site est un espace sacré dédié à la guidance spirituelle et à la paix intérieure.
          Il a été conçu avec foi, amour et lumière pour tous ceux qui cherchent à entendre des messages célestes. 👼
        </p>

        <div className="bg-gray-100 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">💬 Témoignages anonymes</h2>

          <div className="space-y-4 max-h-60 overflow-y-auto mb-4 text-sm text-left">
            {comments.length === 0 ? (
              <p className="text-gray-600 text-center">Aucun commentaire pour le moment. Sois le premier à partager 💖</p>
            ) : (
              comments.map((c, idx) => (
                <div key={idx} className="bg-white p-3 rounded shadow text-gray-800">
                  <p>{c.text}</p>
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
            className="w-full p-3 rounded-lg border border-gray-300 bg-white text-black placeholder:text-gray-500 mb-3"
          />

          <button
            onClick={handleAddComment}
            disabled={loading}
            className="w-full sm:w-auto px-5 py-2 bg-yellow-400 text-indigo-900 font-semibold rounded-full hover:bg-yellow-300 transition"
          >
            {loading ? 'Envoi en cours...' : 'Partager'}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
