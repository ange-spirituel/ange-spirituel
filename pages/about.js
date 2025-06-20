import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../components/lib/supabase';

export default function AboutPage() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  // Récupération des commentaires depuis Supabase
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

  // Enregistrer un nouveau commentaire
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
    <div className="min-h-screen flex flex-col justify-between text-white bg-[#1a1440]">
      <Head>
        <title>À propos — Ange Répond</title>
      </Head>

      <Header />

      <main className="max-w-3xl mx-auto p-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-300">
          🙏 À propos de ce sanctuaire spirituel
        </h1>
        <p className="text-lg leading-relaxed mb-8">
          Ce site est un espace sacré dédié à la guidance spirituelle et à la paix intérieure. 
          Il a été conçu avec foi, amour et lumière pour tous ceux qui cherchent à entendre des messages célestes. 👼
        </p>

        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-yellow-200">💬 Témoignages anonymes</h2>

          <div className="space-y-4 max-h-60 overflow-y-auto mb-4 text-sm text-left">
            {comments.length === 0 ? (
              <p className="text-gray-300">Aucun commentaire pour le moment. Sois le premier à partager 💖</p>
            ) : (
              comments.map((c, idx) => (
                <div key={idx} className="bg-white/5 p-3 rounded shadow">
                  <p className="text-purple-100">{c.text}</p>
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
            className="w-full p-3 rounded-lg border border-purple-200 bg-white/20 text-white placeholder:text-gray-300 mb-3"
          />

          <button
            onClick={handleAddComment}
            disabled={loading}
            className="px-5 py-2 bg-yellow-300 text-indigo-900 font-semibold rounded-full hover:bg-yellow-200 transition"
          >
            {loading ? 'Envoi en cours...' : 'Partager'}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}