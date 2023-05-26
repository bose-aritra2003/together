'use client';

import {FullMessageType} from "@/app/types";
import {FC, useState} from "react";
import {useSession} from "next-auth/react";
import Avatar from "@/app/components/avatars/Avatar";
import {format} from "date-fns";
import Image from "next/image";
import ImageModal from "@/app/components/modals/ImageModal";
import SeenUsersModal from "@/app/components/modals/SeenUsersModal";
import Sentiment from "@/app/components/conversations/conversationId/Sentiment";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
  isSecondLast?: boolean;
}

const MessageBox: FC<MessageBoxProps> = ({data, isLast, isSecondLast}) => {
  const session = useSession();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isSeenModalOpen, setIsSeenModalOpen] = useState(false);

  const isOwnMessage = session?.data?.user?.email === data.sender?.email;
  const seenList = (data.seen || []).filter((user) => user.email !== data?.sender?.email);

  // Defining the dynamic classes separately since there is a lot
  const container = `
    flex gap-3 p-4
    ${isOwnMessage && "justify-end"}
  `;

  const avatar = `
    ${isOwnMessage && "order-2"}
  `;

  const body = `
    flex flex-col gap-2 w-2/3 sm:w-1/2
    ${isOwnMessage && "items-end"}
  `;

  const message = `
    text-sm w-fit overflow-hidden
    ${isOwnMessage ? "bg-emerald-500 text-white" : "bg-gray-100"}
    ${data.image ? "rounded-md p-0 bg-transparent" : "rounded-lg py-2 px-3"}
  `;

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender}/>
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">
            {data.sender.name}
          </div>
          <div className="text-xs text-gray-500">
            {format(new Date(data.createdAt), 'p')}
          </div>
        </div>
        <div className={`
          flex items-center gap-2
          ${isOwnMessage && "flex-row-reverse"}
        `}
        >
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
                    blurDataURL='data:image/webp;base64,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'
                    src={data.image}
                    className="object-cover cursor-pointer hover:scale-110 transition-all ease-in-out translate"
                  />
                </>

              ) : (
                <div>{data.body}</div>
              )
            }
          </div>
          {
            (isLast || isSecondLast) && !data.image && (
              <Sentiment message={data.body!}/>
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