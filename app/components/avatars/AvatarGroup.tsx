'use client';

import { User } from "@prisma/client";
import { FC } from "react";
import Image from "next/image";

interface AvatarGroupProps {
  users?: User[];
}

const AvatarGroup: FC<AvatarGroupProps> = ({ users = [] }) => {
  const slicedUsers = users.slice(0, 3);

  const positionMap = {
    0: "top-0 left-3",
    1: "bottom-0",
    2: "bottom-0 right-0"
  };

  return (
    <div className="relative h-11 w-11">
      {
        slicedUsers.map((user, index) => (
          <div
            key={user.id}
            className={`
              absolute inline-block rounded-full overflow-hidden h-5 w-5 
              ${positionMap[index as keyof typeof positionMap]}
            `}
          >
            <Image
              fill
              alt="avatar"
              placeholder="blur"
              blurDataURL="/placeholders/profile-placeholder.png"
              src={user?.image || '/placeholders/profile-placeholder.png'}
            />
          </div>
        ))
      }
    </div>
  );
};
export default AvatarGroup;