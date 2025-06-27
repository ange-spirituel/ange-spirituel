// pages/tarot.js
import Head from 'next/head';
import { Button } from '@/components/ui/button';

export default function TarotPage() {
  return (
    <>
      <Head>
        <title>Tarot Spirituel – Ange IA</title>
      </Head>
      <main className="max-w-3xl mx-auto py-12 px-4 space-y-8 text-center">
        <h1 className="text-4xl font-bold text-purple-700">Tirage de Tarot Intuitif</h1>
        <p className="text-gray-700">Pose ton intention et laisse les cartes te répondre. Le tirage se fait en 3 cartes, inspiré des énergies du moment.</p>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">Lancer le tirage</Button>
      </main>
    </>
  );
}

// pages/horoscope.js
import Head from 'next/head';
import { Button } from '@/components/ui/button';

export default function HoroscopePage() {
  return (
    <>
      <Head>
        <title>Horoscope du Jour – Ange IA</title>
      </Head>
      <main className="max-w-3xl mx-auto py-12 px-4 space-y-8 text-center">
        <h1 className="text-4xl font-bold text-purple-700">Horoscope Spirituel</h1>
        <p className="text-gray-700">Choisis ton signe astrologique et découvre les énergies du jour pour toi. Une lecture céleste personnalisée.</p>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">Voir mon horoscope</Button>
      </main>
    </>
  );
}

// pages/message.js
import Head from 'next/head';
import { Button } from '@/components/ui/button';

export default function MessagePage() {
  return (
    <>
      <Head>
        <title>Message de ton Ange – IA Spirituelle</title>
      </Head>
      <main className="max-w-3xl mx-auto py-12 px-4 space-y-8 text-center">
        <h1 className="text-4xl font-bold text-purple-700">Ton Message Céleste</h1>
        <p className="text-gray-700">Un message personnalisé de ton ange gardien t’attend. Laisse-toi toucher par cette guidance divine.</p>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">Recevoir mon message</Button>
      </main>
    </>
  );
}
