import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

export default function TemoignagesPage() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur de chargement :', error.message);
      } else {
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
        .insert([{ content: newComment }]);

      if (error) {
        alert("Erreur lors de l'envoi : " + error.message);
      } else {
        setComments([data[0], ...comments]);
        setNewComment('');
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-white bg-gradient-to-b from-indigo-900 via-purple-800 to-pink-700">
      <Head>
        <title>💬 Témoignages — Ange Répond</title>
      </Head>

      <Header />

      <main className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-pink-100 text-center mb-6">💬 Témoignages</h1>

        <div className="space-y-4 max-h-[300px] overflow-y-auto mb-6 bg-white bg-opacity-10 p-4 rounded shadow">
          {comments.length === 0 ? (
            <p className="text-gray-300 text-center">Aucun témoignage pour le moment.</p>
          ) : (
            comments.map((c, idx) => (
              <div key={idx} className="bg-white bg-opacity-20 p-3 rounded text-sm">
                <p>{c.content}</p>
                <p className="text-right text-xs text-gray-300 mt-1">
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
          placeholder="Ton message ou témoignage..."
          className="w-full p-2 border rounded bg-white bg-opacity-20 text-white placeholder-gray-300"
        />

        <button
          onClick={handleAddComment}
          disabled={loading}
          className="w-full mt-2 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
        >
          {loading ? 'Envoi en cours...' : 'Envoyer mon témoignage'}
        </button>
      </main>

      <Footer />
    </div>
  );
}