'use client';

import { FC, useEffect, useMemo, useState} from "react";
import { FullConversationType } from "@/app/types";
import useConversation from "@/app/hooks/useConversation";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import ConversationBox from "@/app/components/conversations/ConversationBox";
import GroupChatModal from "@/app/components/modals/GroupChatModal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";
import { useRouter } from "next/navigation";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
}

const ConversationList: FC<ConversationListProps> = ({ initialItems, users }) => {
  const session = useSession();
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [isGroupChatModalOpen, setIsGroupChatModalOpen] = useState(false);
  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) => current.map((currentConversation) => {
        if (currentConversation.id === conversation.id) {
          return {
            ...currentConversation,
            messages: conversation.messages
          };
        }

        return currentConversation;
      }))
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [
          ...current.filter((conv) => conv.id !== conversation.id)
        ]
      });

      if (conversationId === conversation.id) {
        router.push('/conversations');
      }
    };

    pusherClient.bind('conversation:new', newHandler);
    pusherClient.bind('conversation:update', updateHandler);
    pusherClient.bind('conversation:remove', removeHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind('conversation:new', newHandler);
      pusherClient.unbind('conversation:update', updateHandler);
      pusherClient.unbind('conversation:remove', removeHandler);
    }
  }, [pusherKey, conversationId, router]);

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isGroupChatModalOpen}
        onClose={() => setIsGroupChatModalOpen(false)}
      />
      <aside
        className={`
          fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200
          ${isOpen ? "hidden": "block w-full left-0"}
        `}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-gray-900">
              Messages
            </div>
            <div
              onClick={() => setIsGroupChatModalOpen(true)}
              className="rounded-full p-2 bg-emerald-100 text-emerald-600 cursor-pointer transition-all ease-in-out hover:opacity-75"
            >
              <AiOutlineUsergroupAdd size={20} />
            </div>
          </div>

          <div className="flex flex-col items-center space-y-1">
            {
              items.map((item) => (
                <ConversationBox
                  key={item.id}
                  data={item}
                  selected={conversationId === item.id}
                />
              ))
            }
          </div>
        </div>
      </aside>
    </>
  );
}
export default ConversationList;