import ClientOnly from './components/ClientOnly';

import RegisterModal from './components/modals/RegisterModal';
import LoginModal from './components/modals/LoginModal';
import RentModal from './components/modals/RentModal';

import Navbar from './components/navbar/Navbar';
import './globals.css';
import { Nunito } from 'next/font/google';
import ToasterProvider from './providers/ToasterProvider';
import ThemesProvider from './providers/ThemesProvider';
import getCurrentUser from './actions/getCurrentUser';
import SearchModal from './components/modals/SearchModal';
import Footer from './components/footer/Footer';
import ShareModal from './components/modals/ShareModal';

export const metadata = {
  title: 'staygo',
  description: 'Shared accommodation platform.',
  manifest: '/manifest.json',
  themeColor: '#fff',
  images: [
    {
      url: 'https://img.freepik.com/fotos-gratis/respingo-colorido-abstrato-3d-background-generativo-ai-background_60438-2509.jpg',
      width: 800,
      height: 600,
    },
  ],
}

const font = Nunito({
  subsets: ["latin"],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en" className='light' style={{ colorScheme: 'light' }}>
      <body className={font.className}>
        <ThemesProvider>
          <ClientOnly>
            <ToasterProvider/>
            <SearchModal/>
            <RentModal/>
            <ShareModal/>
            <LoginModal/>
            <RegisterModal/>
            <Navbar currentUser={currentUser} />
          </ClientOnly>
          <div className='pb-20 pt-28'>
            {children}
          </div>
          <ClientOnly>
            <Footer />
          </ClientOnly>
        </ThemesProvider>
      </body>
    </html>
  )
}
