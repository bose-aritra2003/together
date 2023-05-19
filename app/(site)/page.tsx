import Image from "next/image";
import AuthForm from "@/app/components/forms/AuthForm";

const Home = () => {
  return (
    <div className="flex flex-col min-h-full justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={60}
          height={60}
          className="mx-auto w-auto"
        />
        <h2 className="mt-6 px-1 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </div>
  )
}
export default Home;
