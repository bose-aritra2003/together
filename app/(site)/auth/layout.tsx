import { ReactNode } from "react";

export const metadata = {
  title: 'Together - Auth',
  description: 'Authentication page',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://together.vercel.app/auth',
    title: "Together - Auth",
    siteName: 'Together',
    description: "Authentication page",
    images: [
      {
        url: 'images/logo.svg',
        width: 512,
        height: 512,
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