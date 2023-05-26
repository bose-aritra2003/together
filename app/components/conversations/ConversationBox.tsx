'use client';

import { FC, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/avatars/Avatar";
import AvatarGroup from "@/app/components/avatars/AvatarGroup";

interface ConversationBoxProps {
  data: FullConversationType,
  selected?: boolean
}

const ConversationBox: FC<ConversationBoxProps> = ({ data, selected }) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Sent an image';
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return 'Started a conversation';
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={`
        w-full relative flex items-center space-x-3 transition-all ease-in-out hover:bg-gray-100 rounded-lg cursor-pointer p-3
        ${selected ? "bg-gray-100" : "bg-white"}
      `}
    >
      {
        data.isGroup ? (
          <AvatarGroup users={data.users} />
        ) : (
          <Avatar user={otherUser} />
        )
      }
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-900">
              { data.name || otherUser.name }
            </p>
            <p className="text-xs text-gray-500 font-light">
              {
                lastMessage?.createdAt && (
                  format(new Date(lastMessage.createdAt), 'p')
                )
              }
            </p>
          </div>
          <p
            className={`
              truncate text-sm italic
              ${hasSeen ? "text-gray-500" : "text-gray-900 font-medium"}
            `}
          >
            { lastMessageText }
          </p>
        </div>
      </div>
    </div>
  );
}
export default ConversationBox;