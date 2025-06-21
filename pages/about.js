import { useState, useEffect } from 'react';
import Head   from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

export default function AboutPage() {
  /* ── États ─────────────────────────────── */
  const [comments, setComments]   = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading]     = useState(false);

  /* ── Récupération des commentaires ─────── */
  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) setComments(data);
      else console.error('Erreur Supabase :', error);
    };
    fetchComments();
  }, []);

  /* ── Ajout d’un commentaire ─────────────── */
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    setLoading(true);

    const { data, error } = await supabase
      .from('comments')
      .insert([{ content: newComment }]);   // ← adapte “content” à ton schéma

    if (!error) {
      setComments([data[0], ...comments]);
      setNewComment('');
    } else {
      console.error('Erreur envoi :', error);
    }
    setLoading(false);
  };

  /* ── Rendu ─────────────────────────────── */
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-gray-800">
      <Head>
        <title>À propos — Ange Répond</title>
      </Head>

      <Header />

      <main className="max-w-3xl mx-auto p-6 text-center">
        {/* ————— Titre & intro ————— */}
        <h1 className="text-3xl font-bold text-pink-600 mb-4">🌟 À propos de ce site</h1>

        <p className="mb-4 leading-relaxed">
          Ce site a été créé avec amour et foi pour offrir un espace de paix, de guidance et de
          connexion spirituelle. Il invite chacun à se recentrer, à se connecter à ses guides,
          à Dieu, ou à son Ange gardien.
        </p>

        <blockquote className="italic text-blue-700 border-l-4 border-blue-300 pl-4 my-4">
          « Demandez, et l’on vous donnera ; cherchez, et vous trouverez ; frappez, et l’on vous ouvrira. »
          <br />— Matthieu&nbsp;7 : 7
        </blockquote>

        <p className="text-gray-700 mb-8">
          Chaque réponse est transmise avec douceur et lumière. Vous avez droit à une question
          gratuite, puis un pack de 7 questions est disponible pour 1 € symbolique.
        </p>

        {/* ————— Témoignages ————— */}
        <div className="bg-gray-100 p-6 rounded-lg shadow mb-6 text-left">
          <h2 className="text-lg font-semibold text-pink-700 mb-3">💬 Témoignages anonymes</h2>

          <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
            {comments.length === 0 ? (
              <p className="text-gray-500">Aucun commentaire pour le moment.</p>
            ) : (
              comments.map((c) => (
                <div key={c.id} className="bg-white p-3 rounded shadow text-sm">
                  <p className="whitespace-pre-wrap">{c.content}</p>
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
            placeholder="Laisse un mot doux ou un témoignage anonyme…"
            className="w-full p-2 border rounded mb-3"
          />

          <button
            onClick={handleAddComment}
            disabled={loading}
            className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
          >
            {loading ? 'Envoi en cours…' : 'Partager'}
          </button>
        </div>

        {/* ————— Signature ————— */}
        <p className="mt-6 text-sm text-gray-600 italic">
          Avec tout mon amour, <strong>Oriane&nbsp;OYONO</strong> 🌸
          <br />
          Que la paix et les bénédictions t’accompagnent sur ton chemin 🙏
        </p>
      </main>

      <Footer />
    </div>
  );
}