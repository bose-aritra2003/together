'use client';

import { User } from "@prisma/client";
import { FC } from "react";
import Image from "next/image";
import clsx from "clsx";
import useOnlineList from "@/app/hooks/useOnlineList";

interface AvatarProps {
  user?: User;
  small?: boolean;
  noStatus?: boolean;
}

const Avatar: FC<AvatarProps> = ({ user, small, noStatus }) => {
  const { members } = useOnlineList();

  const isOnline = members.indexOf(user?.email!) !== -1;

  return (
    <div className="relative">
      <div
        className={clsx(
          "relative inline-block rounded-full overflow-hidden",
          small ? "h-8 w-8" : "h-11 w-11",
        )}
      >
        <Image
          fill
          alt="avatar"
          placeholder="blur"
          blurDataURL="/placeholders/profile-placeholder.png"
          src={user?.image || '/placeholders/profile-placeholder.png'}
        />
      </div>
      {
        isOnline && (
          <span
            className={clsx(
              "absolute rounded-full bg-sky-500 ring-2 ring-white top-0 right-0 h-3 w-3",
              noStatus ? "hidden" : "block"
            )}
          />
        )
      }
    </div>
  );
}
export default Avatar;