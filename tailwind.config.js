import '../styles/globals.css';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const path = router.pathname;

  // Fonction qui détermine si on doit cacher le fond
  const shouldHideBackground = () => {
    const pathsToExclude = [
      '/about',
      '/login',
      '/register',
      /^\/admin/,           // toutes les pages qui commencent par /admin
      /^\/product\/\d+$/,   // pages du type /product/123
    ];

    return pathsToExclude.some((pattern) =>
      pattern instanceof RegExp ? pattern.test(path) : pattern === path
    );
  };

  return (
    <div className={shouldHideBackground() ? 'bg-white' : 'bg-gradient-to-br from-pink-200 to-yellow-100 min-h-screen'}>
      <Component {...pageProps} />
    </div>
  );
}
