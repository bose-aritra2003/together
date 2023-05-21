'use client';

import { FC, useState } from "react";
import useRoutes from "@/app/hooks/useRoutes";
import { User } from "@prisma/client";
import DesktopItem from "@/app/components/sidebar/DesktopItem";
import Avatar from "@/app/components/avatars/Avatar";
import SettingsModal from "@/app/components/modals/SettingsModal";


interface DesktopSidebarProps {
  currentUser: User
}

const DesktopSidebar: FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-2 lg:pb-4 lg:flex lg:flex-col justify-between">
        <nav className="mt-4 flex flex-col justify-between">
          <ul
            role="list"
            className="flex flex-col items-center space-y-1"
          >
            {
              routes.map((item, idx) => (
                <DesktopItem
                  key={idx}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  active={item.active}
                  onClick={item.onClick}
                />
              ))
            }
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col justify-between items-center">
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer transition-all ease-in-out hover:opacity-75"
          >
            <Avatar user={currentUser}/>
          </div>
        </nav>
      </div>
    </>
  );
}
export default DesktopSidebar;