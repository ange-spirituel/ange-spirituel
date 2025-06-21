import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

export default function AboutPage() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  /* ─── Récupération des commentaires ─────────────────────────── */
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

  /* ─── Ajout d’un commentaire ────────────────────────────────── */
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('comments')
      .insert([{ content: newComment }]);   // colonne “content”

    if (!error) {
      setComments([data[0], ...comments]);
      setNewComment('');
    } else {
      console.error('Erreur envoi :', error);
    }
    setLoading(false);
  };

  /* ─── Rendu ─────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen flex flex-col justify-between text-white relative z-10">
      <Head>
        <title>À propos — Ange Répond</title>
      </Head>

      <Header />

      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-pink-200 mb-4 text-center">
            🌟 À propos de ce site
          </h1>

          <p className="mb-4 leading-relaxed">
            Ce site a été créé avec amour et foi pour offrir un espace de paix, de guidance et de connexion spirituelle.
            Il invite chacun à se recentrer, à se connecter à ses guides, à Dieu, à la Source, l’Univers ou à son Ange gardien.
          </p>

          <blockquote className="italic text-blue-100 border-l-4 border-blue-300 pl-4 my-4">
            « Demandez, et l’on vous donnera ; cherchez, et vous trouverez ; frappez, et l’on vous ouvrira. »
            <br />— Matthieu&nbsp;7 : 7
          </blockquote>

          <p className="mb-8">
            Chaque réponse est transmise avec amour, douceur et lumière.
            Un pack de 7 questions est disponible pour 1 € symbolique.
          </p>

          {/* ─── Témoignages ─────────────────────────────── */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold text-pink-100 mb-3">💬 Témoignages anonymes</h2>

            <div className="space-y-3 max-h-60 overflow-y-auto mb-4 pr-2">
              {comments.length === 0 ? (
                <p className="text-gray-200">Aucun commentaire pour le moment.</p>
              ) : (
                comments.map((c) => (
                  <div key={c.id} className="bg-white/20 backdrop-blur-sm p-3 rounded text-sm">
                    <p className="whitespace-pre-wrap">{c.content}</p>
                    <p className="text-right text-xs text-gray-200 mt-1">
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
              className="w-full p-2 border rounded bg-white/20 text-white placeholder-gray-300"
            />

            <button
              onClick={handleAddComment}
              disabled={loading}
              className="w-full py-2 mt-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
            >
              {loading ? 'Envoi en cours…' : 'Partager'}
            </button>
          </div>

          <p className="mt-6 text-sm italic text-center">
            Avec tout mon amour, <strong>Oriane OYONO</strong> 🌸
            <br />
            Que la paix et les bénédictions t’accompagnent sur ton chemin 🙏
          </p>

          <div className="text-center mt-4">
            <Link href="/temoignages" className="text-pink-300 hover:underline">
              Voir les témoignages
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
