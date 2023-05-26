'use client';
import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = (
  {
    type,
    fullWidth,
    children,
    onClick,
    secondary,
    danger,
    disabled
  }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`
        flex items-center justify-center rounded-lg px-3 py-2 text-md font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all ease-in-out
        ${disabled && 'opacity-50 cursor-not-allowed'}
        ${fullWidth && 'w-full'}
        ${secondary ? 'text-gray-900 hover:bg-gray-100' : 'text-white'}
        ${danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600'}
        ${!secondary && !danger && 'bg-emerald-500 hover:bg-emerald-600 focus-visible:outline-emerald-600'}
      `}
    >
      {children}
    </button>
  );
}
export default Button;