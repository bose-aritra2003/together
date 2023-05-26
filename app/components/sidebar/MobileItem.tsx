'use client';

import Link from 'next/link'
import { FC } from "react";

interface MobileItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const MobileItem: FC<MobileItemProps> = (
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
    <Link
      href={href}
      onClick={handleClick}
      className={`
        group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-emerald-500 transition-all ease-in-out
        ${active ? 'bg-emerald-100 text-emerald-900' : 'hover:text-emerald-900 hover:bg-gray-100'}
      `}
    >
      <Icon className="h-6 w-6 shrink-0" />
      <span className="sr-only">{ label }</span>
    </Link>
  );
}
export default MobileItem;