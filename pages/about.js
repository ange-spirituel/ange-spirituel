<main className="max-w-3xl mx-auto p-6 sm:p-8 text-center">
  <h1 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-300 drop-shadow-md">
    🙏 À propos de ce sanctuaire spirituel
  </h1>

  <p className="text-lg leading-relaxed mb-8 text-gray-100 drop-shadow">
    Ce site est un espace sacré dédié à la guidance spirituelle et à la paix intérieure.
    Il a été conçu avec foi, amour et lumière pour tous ceux qui cherchent à entendre des messages célestes. 👼
  </p>

  <div className="bg-white/20 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl">
    <h2 className="text-xl font-semibold mb-4 text-yellow-100 drop-shadow-sm">💬 Témoignages anonymes</h2>

    <div className="space-y-4 max-h-60 overflow-y-auto mb-4 text-sm text-left">
      {comments.length === 0 ? (
        <p className="text-gray-300 italic">Aucun commentaire pour le moment. Sois le premier à partager 💖</p>
      ) : (
        comments.map((c, idx) => (
          <div key={idx} className="bg-white/10 p-3 rounded shadow">
            <p className="text-purple-100 drop-shadow-sm">{c.text}</p>
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
      className="w-full p-3 rounded-lg border border-purple-300 bg-white/20 text-white placeholder:text-gray-300 mb-3 shadow-sm"
    />

    <button
      onClick={handleAddComment}
      disabled={loading}
      className="px-5 py-2 bg-yellow-300 text-indigo-900 font-semibold rounded-full hover:bg-yellow-200 transition shadow-md"
    >
      {loading ? 'Envoi en cours...' : 'Partager'}
    </button>
  </div>
</main>
