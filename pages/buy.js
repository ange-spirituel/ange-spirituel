// pages/buy.js
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

export default function BuyCreditsPage() {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    // Ce code ne s'exécute que côté client
    setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY));
  }, []);

  const handleBuyCredits = async () => {
    if (!stripePromise) return;

    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    const data = await res.json();

    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: data.sessionId });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold mb-4">Acheter des crédits</h1>
      <p className="mb-6">1€ = 7 questions spirituelles</p>
      <button
        onClick={handleBuyCredits}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={!stripePromise}
      >
        Acheter des crédits
      </button>
    </div>
  );
}
