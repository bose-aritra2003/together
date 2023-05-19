import '@/app/styles/globals.css'
import { Inter } from 'next/font/google'
import ToasterContext from "@/app/context/ToasterContext";
import AuthContext from "@/app/context/AuthContext";
import OnlineStatus from "@/app/components/OnlineStatus";
import { ReactNode } from "react";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Together',
  description: 'Cultivating Conversations, Crafting Connections',
}

const RootLayout = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          <OnlineStatus />
          { children }
        </AuthContext>
      </body>
    </html>
  )
}
export default RootLayout;
