// This component wraps around everything, meaning it will be shown around all pages. 

import Header from '../components/Header'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />

      <main className='container'>
        <Component {...pageProps} />
      </main>
    </>
  ) 
}

export default MyApp
