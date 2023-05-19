'use client';

import { User } from "@prisma/client";
import { FC, useState } from "react";
import UserBox from "@/app/components/users/UserBox";
import SettingsModal from "@/app/components/modals/SettingsModal";
import { AiOutlineSetting } from "react-icons/ai";

interface UserListProps {
  items: User[];
  currentUser: User;
}

const UserList: FC<UserListProps> = ({ items, currentUser }) => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
      <aside
      className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0"
    >
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-4">
          <div className="text-2xl font-bold text-gray-900">
            People
          </div>
          <div
            onClick={() => setIsSettingsModalOpen(true)}
            className="rounded-full p-2 bg-emerald-100 text-emerald-600 cursor-pointer transition-all ease-in-out hover:opacity-75"
          >
            <AiOutlineSetting size={20} />
          </div>
        </div>

        <div className="flex flex-col">
          {
            items.map((item) => (
              <UserBox
                  key={item.id}
                  data={item}
              />
            ))
          }
        </div>
      </div>
    </aside>
    </>
  );
}
export default UserList;