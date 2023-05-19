'use client';

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/buttons/Button";
import AuthSocialButton from "@/app/components/buttons/AuthSocialButton";
import Spinner from "@/app/components/loading/Spinner";
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [variant, setVariant] = useState<Variant>('LOGIN');

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/users')
    }
  }, [session?.status, router])

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    if (variant === 'REGISTER') {
      try {
        const res = await axios.post('/api/register', data)
        toast.success(res.data.message);
        router.push('/');
      } catch (error: any) {
        toast.error(error.response.data);
      } finally {
        setIsLoading(false);
      }
    }
    if (variant === 'LOGIN') {
      setIsLoading(true);
      try {
        const callback = await signIn('credentials', {
          ...data,
          redirect: false,
        })
        if (callback?.error) {
          toast.error('Invalid credentials');
        } else if (callback?.ok) {
          toast.success('Logged in successfully');
          router.push('/users');
        }
      } finally {
        setIsLoading(false);
      }
    }
  }

  const socialAction = async (action: string) => {
    setIsLoading(true);
    try {
      const callback = await signIn(action, { redirect: false });
      if (callback?.error) {
        toast.error('Invalid credentials');
      } else if (callback?.ok) {
        toast.success('Logged in successfully');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="sm:mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="px-4 py-8 sm:shadow sm:bg-white sm:rounded-lg sm:px-10">

        {/* Authentication form */}
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {variant === 'REGISTER' && (
            <Input
              id="name"
              label="Name"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id="email"
            label="Email address"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <div>
            <Button
              fullWidth
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <Spinner />}
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>

        {/* Separator */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-100 sm:bg-white text-gray-500">
                {variant === 'LOGIN' ? 'Or continue with' : 'Or sign in with'}
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              onClick={() => socialAction('github')}
              variant='github'
              disabled={isLoading}
            />
            <AuthSocialButton
              onClick={() => socialAction('google')}
              variant='google'
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            { variant === 'LOGIN' ? 'New to Together?' : 'Already have an account?' }
          </div>
          <div
            onClick={toggleVariant}
            className="underline cursor-pointer transition-all ease-in-out hover:text-emerald-900"
          >
            { variant === 'LOGIN' ? 'Create an account' : 'Sign in' }
          </div>
        </div>
      </div>
    </div>
  );
}
export default AuthForm;