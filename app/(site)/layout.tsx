import '@/app/styles/globals.css'
import { Inter } from 'next/font/google'
import { ReactNode } from "react";
import ToasterContext from "@/app/context/ToasterContext";
import AuthContext from "@/app/context/AuthContext";
import OnlineStatus from "@/app/components/OnlineStatus";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Together - Home',
  description: 'Cultivating Conversations, Crafting Connections',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://together-chat.vercel.app',
    title: "Together - Home",
    siteName: 'Together',
    description: "Cultivating Conversations, Crafting Connections",
    images: [
      {
        url: 'images/logo.svg',
        width: 256,
        height: 256,
      }
    ],
  },
  twitter: {
    title: "Together - Home",
    description: "Cultivating Conversations, Crafting Connections",
    card: "summary_large_image",
    images: [
      {
        url: 'images/logo.png',
        width: 256,
        height: 256,
      }
    ],
  }
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterContext />
        <AuthContext>
          <OnlineStatus />
          { children }
        </AuthContext>
      </body>
    </html>
  )
}
export default RootLayout;
