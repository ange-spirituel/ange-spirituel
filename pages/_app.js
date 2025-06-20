// pages/_app.js
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-angel min-h-screen text-white">
      <Component {...pageProps} />
    </div>
  );
}
