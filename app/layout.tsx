import './globals.css'
import Navbar from '@/app/components/navbar/Navbar';
import LoginModal from '@/app/components/modals/LoginModal';
import RegisterModal from '@/app/components/modals/RegisterModal';
import SearchModal from '@/app/components/modals/SearchModal';
import RentModal from '@/app/components/modals/RentModal';
import ToasterProvider from '@/app/providers/ToasterProvider';
import ClientOnly from './components/ClientOnly';
import getCurrentUser from './actions/getCurrentUser';
import { Nunito } from 'next/font/google'

const font = Nunito({ subsets: ['latin'], });

export const metadata = {
  title: 'Casa das Conchas | Coleção',
  description: 'Casa das Conchas | Foz do Arelho',
}

export default async function RootLayout( { children, } : { children: React.ReactNode } ) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  )
}
