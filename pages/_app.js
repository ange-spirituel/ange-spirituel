import '../styles/globals.css';
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  const noBackgroundPages = ['/about']

  const shouldHideBackground = noBackgroundPages.includes(router.pathname)

  return (
    <div className={shouldHideBackground ? 'no-background' : 'with-background'}>
      <Component {...pageProps} />
    </div>
  )
}