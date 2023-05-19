'use client';

import clsx from 'clsx';
import Link from 'next/link'
import { FC } from "react";

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem: FC<DesktopItemProps> = (
  {
    label,
    icon: Icon,
    href,
    onClick,
    active
  }
) => {
  const handleClick = async () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-emerald-500 transition-all ease-in-out',
          active ? 'bg-emerald-100 text-emerald-900' : 'hover:text-emerald-900 hover:bg-gray-100'
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{ label }</span>
      </Link>
    </li>
  );
}
export default DesktopItem;