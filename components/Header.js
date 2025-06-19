import Link from 'next/link';

export default function Header() {
  return (
    <header style={{
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '20px',
      textAlign: 'center',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>👼 Ange Répond</h2>
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Link href="/">Accueil</Link>
        <Link href="/ask">Poser une Question</Link>
        <Link href="/about">À propos</Link>
      </nav>
    </header>
  );
}