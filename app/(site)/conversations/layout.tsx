import { ReactNode } from "react";
import Sidebar from "@/app/components/sidebar/Sidebar";
import ConversationList from "@/app/components/conversations/ConversationList";
import getConversations from "@/app/actions/getConversations";
import getUsers from "@/app/actions/getUsers";

export const metadata = {
  title: 'Together - Conversations',
  description: 'Conversations page',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://together.vercel.app/conversations',
    title: "Together - Conversations",
    siteName: 'Together',
    description: "Conversations page",
    images: [
      {
        url: 'images/logo.svg',
        width: 512,
        height: 512,
      }
    ],
  },
  twitter: {
    title: "Together - Conversations",
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

const ConversationsLayout = async ({ children } : { children: ReactNode }) => {
  const [
    users,
    conversations
  ] = await Promise.all([getUsers(), getConversations()]);

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <ConversationList
          users={users}
          initialItems={conversations}
        />
        { children }
      </div>
    </Sidebar>
  );
}
export default ConversationsLayout;