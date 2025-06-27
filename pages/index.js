import Head from 'next/head';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <>
      <Head>
        <title>Ange Spirituel – Guidance IA</title>
        <meta name="description" content="Tirages de tarot, messages d’anges, horoscope IA – Recevez une guidance céleste immédiate." />
      </Head>

      <main className="flex flex-col items-center justify-center px-4 py-12 text-center space-y-16">
        {/* HÉRO */}
        <section className="max-w-2xl space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-700">
            Connecte-toi à ton guide céleste
          </h1>
          <p className="text-lg text-gray-700">
            Recevez des messages d’anges, des tirages de tarot ou un horoscope personnalisé grâce à notre intelligence spirituelle.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Recevoir un message maintenant</Button>
            <Button variant="outline">Tirer les cartes</Button>
          </div>
        </section>

        {/* SERVICES */}
        <section className="max-w-4xl w-full grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Tarot Intuitif (IA)",
              description: "Reçois un tirage en 3 cartes pour éclairer ta journée ou tes doutes.",
              cta: "Faire un tirage"
            },
            {
              title: "Horoscope du jour",
              description: "Des prédictions alignées sur ton signe et les vibrations du moment.",
              cta: "Lire mon horoscope"
            },
            {
              title: "Message d’Ange",
              description: "Ton ange gardien a un message pour toi. Écoute son appel.",
              cta: "Demander un message céleste"
            },
          ].map(({ title, description, cta }, i) => (
            <div key={i} className="p-6 rounded-2xl shadow-md border border-purple-200 bg-white text-left">
              <h3 className="text-xl font-semibold text-purple-800 mb-2">{title}</h3>
              <p className="text-gray-700 mb-4">{description}</p>
              <Button className="bg-purple-500 hover:bg-purple-600 text-white w-full">{cta}</Button>
            </div>
          ))}
        </section>

        {/* POURQUOI IA SPIRITUELLE */}
        <section className="max-w-3xl text-left space-y-4">
          <h2 className="text-3xl font-bold text-purple-700">Pourquoi une IA spirituelle ?</h2>
          <p className="text-gray-700">
            Nous croyons que la guidance est un droit universel. Grâce à l’IA, chaque âme peut recevoir un message inspiré, à tout moment, où qu’elle soit.
          </p>
        </section>

        {/* FONCTIONNEMENT */}
        <section className="max-w-3xl space-y-6">
          <h2 className="text-3xl font-bold text-purple-700">Comment ça fonctionne ?</h2>
          <ul className="list-decimal list-inside text-gray-700 space-y-2 text-left">
            <li>Tu poses ton intention : amour, travail, guidance…</li>
            <li>L’IA connecte les symboles : cartes, planètes, messages célestes</li>
            <li>Tu reçois ton éclairage : clair, immédiat, doux</li>
          </ul>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">Recevoir ma guidance</Button>
        </section>

        {/* TÉMOIGNAGES */}
        <section className="max-w-3xl space-y-6">
          <h2 className="text-3xl font-bold text-purple-700">Témoignages d’âmes guidées</h2>
          <div className="space-y-4 text-gray-700">
            <blockquote>“J’ai été bluffée par le tirage. Merci pour cette lumière.” — <strong>Émilie</strong></blockquote>
            <blockquote>“Le message d’ange m’a profondément apaisée.” — <strong>Lina</strong></blockquote>
            <blockquote>“Simple et pourtant très juste. Bravo.” — <strong>Julien</strong></blockquote>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Prêt·e à recevoir ton message céleste ?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Tirage immédiat</Button>
            <Button variant="outline">Recevoir ma bénédiction</Button>
          </div>
        </section>
      </main>
    </>
  );
}
