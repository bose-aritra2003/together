import { FC } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub, AiOutlineGoogle } from "react-icons/ai";
import clsx from "clsx";

interface AuthSocialButtonProps {
  onClick: () => void;
  variant: 'google' | 'github';
  disabled?: boolean;
}

const AuthSocialButton: FC<AuthSocialButtonProps> = (
  {
    onClick,
    variant,
    disabled,
  }
) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "flex w-full justify-center space-x-1 items-center text-sm rounded-lg px-4 py-2 shadow-sm ring-1 ring-inset transition-all ease-in-out focus:outline-offset-0",
        disabled ? (
          "text-gray-500 bg-gray-100 hover:bg-gray-100 ring-gray-500 hover:ring-gray-500 cursor-not-allowed"
        ) : (
          "hover:bg-emerald-50 ring-emerald-500 hover:ring-emerald-900"
        )
      )}
    >
      {/* Google */}
      {
        variant === 'google' && (
          <>
            {
              disabled ? (
                <><AiOutlineGoogle size={24} /> <p>Google</p></>
              ) : (
                <><FcGoogle size={24} /> <p>Google</p></>
              )
            }
          </>
        )
      }

      {/* GitHub */}
      {
        variant === 'github' && (
          <><AiFillGithub size={24} /> <p>GitHub</p></>
        )
      }
    </button>
  );
}
export default AuthSocialButton;