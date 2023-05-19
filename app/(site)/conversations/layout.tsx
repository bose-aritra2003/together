import { ReactNode } from "react";
import Sidebar from "@/app/components/sidebar/Sidebar";
import ConversationList from "@/app/components/conversations/ConversationList";
import getConversations from "@/app/actions/getConversations";
import getUsers from "@/app/actions/getUsers";

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