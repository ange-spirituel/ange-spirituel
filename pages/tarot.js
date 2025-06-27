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
