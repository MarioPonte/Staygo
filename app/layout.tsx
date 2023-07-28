import ClientOnly from './components/ClientOnly';

import RegisterModal from './components/modals/RegisterModal';
import LoginModal from './components/modals/LoginModal';
import RentModal from './components/modals/RentModal';

import Navbar from './components/navbar/Navbar';
import './globals.css';
import { Nunito } from 'next/font/google';
import ToasterProvider from './providers/ToasterProvider';
import getCurrentUser from './actions/getCurrentUser';
import SearchModal from './components/modals/SearchModal';
import Footer from './components/footer/Footer';

export const metadata = {
  title: 'staygo',
  description: 'Shared accommodation platform.',
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
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider/>
          <SearchModal/>
          <RentModal/>
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
      </body>
    </html>
  )
}
