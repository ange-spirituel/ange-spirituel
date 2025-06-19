import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Crédit de 7 questions',
              description: 'Pose 7 questions à ton ange.',
            },
            unit_amount: 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/ask?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/ask?canceled=true`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Erreur Stripe:', err.message);
    res.status(500).json({ error: 'Erreur lors de la création de la session Stripe.' });
  }
}
