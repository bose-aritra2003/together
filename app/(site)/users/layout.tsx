import { ReactNode } from "react";
import Sidebar from "@/app/components/sidebar/Sidebar";
import getUsers from "@/app/actions/getUsers";
import UserList from "@/app/components/users/UserList";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const metadata = {
  title: 'Together - Users',
  description: 'Users page',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://together.vercel.app/users',
    title: "Together - Users",
    siteName: 'Together',
    description: "Users page",
    images: [
      {
        url: 'images/logo.svg',
        width: 512,
        height: 512,
      }
    ],
  },
  twitter: {
    title: "Together - Users",
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

  const [
    users,
    currentUser
  ] = await Promise.all([getUsers(), getCurrentUser()]);

  return (
      // @ts-expect-error Server Component
      <Sidebar>
          <div className="h-full">
            <UserList items={users} currentUser={currentUser!} />
            { children }
          </div>
      </Sidebar>
  );
}
export default UsersLayout;