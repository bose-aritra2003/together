'use client';

import { FullMessageType } from "@/app/types";
import { FC, useState } from "react";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import Avatar from "@/app/components/avatars/Avatar";
import { format } from "date-fns";
import Image from "next/image";
import ImageModal from "@/app/components/modals/ImageModal";
import SeenUsersModal from "@/app/components/modals/SeenUsersModal";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isSeenModalOpen, setIsSeenModalOpen] = useState(false);

  const isOwnMessage = session?.data?.user?.email === data.sender?.email;
  const seenList = (data.seen || []).filter((user) => user.email !== data?.sender?.email);

  // Defining the dynamic classes separately since there is a lot
  const container = clsx(
    "flex gap-3 p-4",
    isOwnMessage && "justify-end"
  );

  const avatar = clsx(
    isOwnMessage && "order-2"
  );

  const body = clsx(
    "flex flex-col gap-2",
    isOwnMessage && "items-end"
  );

  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwnMessage ? "bg-emerald-500 text-white" : "bg-gray-100",
    data.image ? "rounded-md p-0 bg-transparent" : "rounded-lg py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">
            { data.sender.name }
          </div>
          <div className="text-xs text-gray-500">
            { format(new Date(data.createdAt), 'p') }
          </div>
        </div>
        <div className={message}>
          <ImageModal
            src={data.image}
            isOpen={isImageModalOpen}
            onClose={() => setIsImageModalOpen(false)}
          />
          {
            data.image ? (
              <>
                <Image
                  onClick={() => setIsImageModalOpen(true)}
                  height={128}
                  width={128}
                  alt="image"
                  placeholder="blur"
                  blurDataURL="/image-placeholder.webp"
                  src={data.image}
                  className="object-cover cursor-pointer hover:scale-110 transition-all ease-in-out translate"
                />
              </>

            ) : (
              <div>{ data.body }</div>
            )
          }
        </div>
        <SeenUsersModal
          isOpen={isSeenModalOpen}
          onClose={() => setIsSeenModalOpen(false)}
          users={seenList}
        />
        {
          isLast && isOwnMessage && (
            <div className="text-xs font-light text-gray-500">
              {
                seenList.length < 1 ? "Delivered" : (
                  <p
                    onClick={() => setIsSeenModalOpen(true)}
                    className="transition-all ease-in-out hover:text-gray-900 cursor-pointer"
                  >
                    {
                      seenList.length === 1 ? `Seen by ${seenList[0].name}` : `Seen by ${seenList.length} members`
                    }
                  </p>
                )
              }
            </div>
          )
        }
      </div>
    </div>
  );
}
export default MessageBox;