import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Success() {
  const router = useRouter();
  const credits = parseInt(router.query.credits || '0');

  useEffect(() => {
    if (credits > 0) {
      const existing = parseInt(localStorage.getItem('credits') || '0');
      localStorage.setItem('credits', existing + credits);
    }
  }, [credits]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-green-600">✅ Paiement réussi</h1>
      <p className="mt-2">Tu as reçu {credits} crédits pour poser des questions à ton ange.</p>
      <button
        onClick={() => router.push('/ask')}
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Continuer
      </button>
    </div>
  );
}
