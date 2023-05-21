import Image from "next/image";
import AuthForm from "@/app/components/forms/AuthForm";
import Link from "next/link";

const Auth = () => {
  return (
    <div className="flex flex-col min-h-full justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={48}
            height={48}
            className="mx-auto w-16 cursor-pointer"
          />
        </Link>
        <AuthForm />
      </div>
    </div>
  )
}
export default Auth;
