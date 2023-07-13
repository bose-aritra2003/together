import { ReactNode } from "react";

export const metadata = {
  title: 'Together - Auth',
  description: 'Authentication page',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://together-chat.vercel.app/auth',
    title: "Together - Auth",
    siteName: 'Together',
    description: "Authentication page",
    images: [
      {
        url: 'images/logo.svg',
        width: 256,
        height: 256,
      }
    ],
  },
  twitter: {
    title: "Together - Auth",
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

const UsersLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full">
      { children }
    </div>
  );
}
export default UsersLayout;