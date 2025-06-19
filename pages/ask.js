import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AskPage() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [creditCount, setCreditCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const adminOK = localStorage.getItem('isAdmin') === 'true';
    const storedCredits = parseInt(localStorage.getItem('creditCount')) || 0;
    setIsAdmin(adminOK);
    setCreditCount(storedCredits);

    if (router.query.success === 'true') {
      localStorage.setItem('creditCount', '7');
      setCreditCount(7);
      alert("✅ Paiement réussi. Tu as maintenant 7 questions.");
    } else if (router.query.canceled === 'true') {
      alert("❌ Paiement annulé.");
    }
  }, [router.query]);

  const validateAdminCode = () => {
    if (secretCode.trim() === process.env.NEXT_PUBLIC_ADMIN_CODE) {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      alert("🔑 Mode admin activé. Accès illimité.");
    } else {
      alert("❌ Code admin incorrect.");
    }
  };

  const handleSubmit = async () => {
    if (!isAdmin && creditCount <= 0) {
      alert("💸 Tu dois acheter du crédit pour poser ta question.");
      return;
    }

    if (!question.trim()) return;
    setLoading(true);
    setAnswer('');

    try {
      const res = await axios.post('/api/ask', {
        question,
        secretCode: isAdmin ? secretCode.trim() : null,
      });

      const responseText = res.data.answer;
      setAnswer(responseText);

      const utterance = new SpeechSynthesisUtterance(responseText);
      utterance.lang = 'fr-FR';
      utterance.voice = speechSynthesis.getVoices().find(v => v.lang === 'fr-FR' && v.name.toLowerCase().includes('femme')) || null;
      utterance.pitch = 1.2;
      utterance.rate = 1;
      speechSynthesis.speak(utterance);

      if (!isAdmin) {
        const newCredit = creditCount - 1;
        localStorage.setItem('creditCount', newCredit.toString());
        setCreditCount(newCredit);
      }

    } catch (error) {
      setAnswer("Erreur lors de la connexion avec ton ange.");
    }

    setLoading(false);
  };

  const handleCheckout = async () => {
    try {
      const res = await axios.post('/api/create-checkout-session');
      window.location.href = res.data.url;
    } catch (error) {
      alert("Erreur lors de la redirection vers Stripe.");
    }
  };

  return (
    <div
      className="min-h-screen text-white flex flex-col justify-between animate-fade-in bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/celestial.jpg')" }}
    >
      <Head>
        <title>✨ Poser une question ✨</title>
      </Head>

      <Header />

      <main className="p-4 max-w-xl mx-auto text-white">
        <h1 className="text-2xl font-bold text-center mb-4">👼 Pose ta question à ton Ange</h1>
        <p className="text-sm text-center mb-2">Respire profondément. Adresse-toi à Dieu, l'Univers,la Source, ton Ange Gardien ou à ton Guide Spirituel,
          poses la question à haute/bas voix ou dans ton coeur, ensuite, écris ta question.</p>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Écris ta question ici..."
          className="w-full p-2 text-black border rounded mb-2"
          rows={3}
        />

        {!isAdmin && (
          <>
            <input
              type="password"
              value={secretCode}
              onChange={(e) => setSecretCode(e.target.value)}
              placeholder="Code Admin (facultatif)"
              className="w-full p-2 text-black border rounded mb-2"
            />
            <button
              onClick={validateAdminCode}
              className="w-full p-2 bg-purple-600 text-white rounded mb-4"
            >
              Valider le code Admin
            </button>
          </>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full p-2 rounded mb-2 ${loading ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
        >
          {loading ? 'Connexion à l’ange...' : 'Poser la question'}
        </button>

        {!isAdmin && (
          <>
            <button
              onClick={handleCheckout}
              className="w-full p-2 bg-green-500 text-white rounded"
            >
              Acheter du crédit (1€ pour 7 questions)
            </button>
            <p className="text-center text-sm mt-2 text-yellow-100">
              Questions restantes : {creditCount}
            </p>
          </>
        )}

        {answer && (
          <div className="mt-4 p-4 bg-white/10 rounded shadow backdrop-blur-sm text-white">
            <p className="italic">{answer}</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
