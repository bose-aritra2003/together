'use client';

import { Conversation, User } from "@prisma/client";
import { FC, useMemo, useState } from "react";
import useOtherUser from "@/app/hooks/useOtherUser";
import Link from "next/link";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import Avatar from "@/app/components/avatars/Avatar";
import ProfileDrawer from "@/app/components/conversations/conversationId/ProfileDrawer";
import AvatarGroup from "@/app/components/avatars/AvatarGroup";
import useOnlineList from "@/app/hooks/useOnlineList";

interface HeaderProps {
  conversation: Conversation & {
    users: User[]
  }
}

const Header: FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { members } = useOnlineList();

  const isOnline = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isOnline ? "Online" : "Offline";
  }, [conversation, isOnline]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div
        className="bg-white w-full flex border-b-2 sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm"
      >
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="lg:hidden block text-emerald-500 transition-all ease-in-out hover:text-emerald-600 cursor-pointer"
          >
            <HiChevronLeft size={32}/>
          </Link>
          {
            conversation.isGroup ? (
              <AvatarGroup users={conversation.users} />
            ) : (
              <Avatar user={otherUser} />
            )
          }

          <div className="flex flex-col">
            <div>
              { conversation.name || otherUser.name }
            </div>
            <div className="text-sm font-light text-gray-500">
              { statusText }
            </div>
          </div>
        </div>
        <div className="flex gap-x-2 items-center">
          <HiEllipsisHorizontal
            size={32}
            onClick={() => setDrawerOpen(true)}
            className="text-emerald-500 cursor-pointer transition-all ease-in-out hover:text-emerald-600"
          />
        </div>
      </div>
    </>

  );
}
export default Header;