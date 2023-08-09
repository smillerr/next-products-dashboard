import MainLayout from '@layout/MainLayout'
import '@styles/globals.css'
import { ProviderAuth } from '@hooks/useAuth'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <ProviderAuth>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout> 
    </ProviderAuth>
    </>
  )  
}

export default MyApp
