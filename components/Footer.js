export default function Footer() {
  return (
    <footer style={{
      marginTop: '50px',
      padding: '20px',
      textAlign: 'center',
      fontSize: '0.9rem',
      color: '#ccc'
    }}>
      <p>© {new Date().getFullYear()} Ange Répond · Tous droits réservés</p>
    </footer>
  );
}