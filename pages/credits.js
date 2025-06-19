// pages/credits.js
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CreditsPage() {
  const handleBuy = async () => {
    const stripe = await stripePromise;

    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
    });

    const session = await res.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Acheter des crédits</h1>
      <p className="mb-4">1€ = 7 questions spirituelles</p>
      <button onClick={handleBuy} className="bg-indigo-600 text-white px-4 py-2 rounded">
        Acheter pour 1€
      </button>
    </div>
  );
}
