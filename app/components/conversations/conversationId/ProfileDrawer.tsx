'use client';

import { Conversation, User } from "@prisma/client";
import { FC, Fragment, useMemo, useState } from "react";
import useOtherUser from "@/app/hooks/useOtherUser";
import { format } from "date-fns";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose, IoTrash } from "react-icons/io5";
import Avatar from "@/app/components/avatars/Avatar";
import ConfirmModal from "@/app/components/modals/ConfirmModal";
import AvatarGroup from "@/app/components/avatars/AvatarGroup";
import useOnlineList from "@/app/hooks/useOnlineList";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & { users: User[] };
}

const ProfileDrawer: FC<ProfileDrawerProps> = ({isOpen, onClose, data}) => {
  const otherUser = useOtherUser(data);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const {members} = useOnlineList();

  const isOnline = members.indexOf(otherUser?.email!) !== -1;

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), 'PP');
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name
  }, [data.name, otherUser.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }
    return isOnline ? 'Online' : 'Offline';
  }, [data, isOnline]);

  return (
    <>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      />
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75"/>
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition-all ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition-all ease-in-out duration-500"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-end">
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              onClick={onClose}
                              className="rounded-md bg-white text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                            >
                              <span className="sr-only">Close panel</span>
                              <IoClose size={24}/>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="flex flex-col items-center">
                          <div className="mb-2">
                            {
                              data.isGroup ? (
                                <AvatarGroup users={data.users}/>
                              ) : (
                                <Avatar user={otherUser}/>
                              )
                            }
                          </div>
                          <div>
                            { title }
                          </div>
                          <div className="text-sm text-gray-500">
                            { statusText }
                          </div>
                          <div className="flex gap-10 my-8">
                            <div
                              onClick={() => setConfirmOpen(true)}
                              className="flex flex-col gap-3 items-center cursor-pointer transition-all ease-in-out hover:opacity-75"
                            >
                              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <IoTrash size={20}/>
                              </div>
                              <div className="text-sm font-medium text-rose-500">
                                Delete conversation
                              </div>
                            </div>
                          </div>
                          <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                            <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                              {
                                data.isGroup ? (
                                  <div>
                                    <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                      Members
                                    </dt>
                                    <dd className="mt-3 text-sm text-gray-900 flex flex-col space-y-4">
                                      {
                                        data.users.map((user, idx) => (
                                          <div className="flex space-x-2 items-center" key={idx}>
                                            <Avatar user={user} small noStatus/>
                                            <div>
                                              <p>{ user.name }</p>
                                              <p className="text-gray-500">{ user.email }</p>
                                            </div>
                                          </div>
                                        ))
                                      }
                                    </dd>
                                  </div>
                                ) : (
                                  <>
                                    <div>
                                      <dl className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                        Email
                                      </dl>
                                      <dd className="mt-1 text-sm text-gray-900">
                                        {otherUser.email}
                                      </dd>
                                    </div>

                                    <hr/>

                                    <div>
                                      <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                        Joined
                                      </dt>
                                      <dd className="mt-1 text-sm text-gray-900">
                                        <time dateTime={joinedDate}>
                                          { joinedDate }
                                        </time>
                                      </dd>
                                    </div>
                                  </>
                                )
                              }
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
export default ProfileDrawer;