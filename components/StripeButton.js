import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_51Ra4BdDzL6H0ml8P7hYEqlTTqx106UvR0Zxoksr70gxQSHG3j1KYB50XHtNiySZnUs3cvG2SHkrKQsAMNNOOrHl200ejPcSfE6');

export default function StripeButton() {
  const handleClick = async () => {
    const stripe = await stripePromise;

    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
    });

    const session = await res.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <button
      onClick={handleClick}
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
    >
      💸 Acheter 7 questions pour 1 €
    </button>
  );
}
