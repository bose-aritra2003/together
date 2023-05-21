'use client';

import { Menu, Transition } from '@headlessui/react';
import { GrClose } from "react-icons/gr";

import Link from "next/link";
import {AiOutlineMenu} from "react-icons/ai";
import useHamburgerRoutes from "@/app/hooks/useHamburgerRoutes";

export const HamburgerMenu = () => {
  const routes = useHamburgerRoutes();
  return (
    <div className="sm:hidden">
      <Menu as="div" className="relative text-right">
        {({open}) => (
          <div>
            <Menu.Button
              className="bg-transparent w-full justify-center rounded-lg p-2 text-xl transition-all ease-in-out hover:bg-emerald-100 focus:outline-none focus:ring-0"
            >
              {
                open ? (<GrClose/>) : (<AiOutlineMenu/>)
              }
            </Menu.Button>
            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-28 origin-top-right divide-y divide-gray-100 rounded-lg bg-gray-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {
                  routes.map(({href, icon: Icon, label}, idx) => (
                    <div className="p-1.5" key={idx}>
                      <Menu.Item>
                        <Link
                          href={href}
                          className="text-gray-900 hover:bg-emerald-100 hover:text-emerald-900 group flex w-full items-center justify-between rounded-md p-1.5"
                        >
                          <Icon className="text-emerald-900"/>
                          <p>{label}</p>
                        </Link>
                      </Menu.Item>
                    </div>
                  ))
                }
              </Menu.Items>
            </Transition>
          </div>
        )}
      </Menu>
    </div>
  );
}
export default HamburgerMenu