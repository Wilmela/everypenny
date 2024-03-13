"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateUserSchema,
  CreateUserType,
  SignInSchema,
  SignInType,
} from "@/lib/validation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/user.action.";
import { initialValue } from "@/constants";
import Spinner from "./Spinner";
import { signIn } from "@/lib/actions/auth.action";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useState } from "react";

type AuthFormType = {
  type: "SignIn" | "SignUp";
};

const AuthForm = ({ type }: AuthFormType) => {
  const SIGN_UP = type === "SignUp";
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<CreateUserType | SignInType>({
    resolver: zodResolver(SIGN_UP ? CreateUserSchema : SignInSchema),
    defaultValues: SIGN_UP ? initialValue : { email: "", password: "" },
  });

  const onSubmit = async (data: CreateUserType | SignInType) => {
    if (SIGN_UP) {
      try {
        const newUser = await createUser(data as CreateUserType);
        if (newUser) {
          router.push("/auth/sign-in");
        }
      } catch (error) {
        throw error;
      }
    } else {
      try {
        const user = await signIn({
          email: data.email,
          password: data.password,
        } as SignInType);

        if (user?.error) {
          setError(user?.error);
          return;
        }
        router.push("/");
      } catch (error) {
        throw error;
      }
    }
  };

  const handleShowPassword = () => {
    setShowPassword((p: boolean) => !p);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="form">
        {SIGN_UP && (
          <>
            <div className="py-1">
              <FormField
                name="firstName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        className="form-input"
                        placeholder="First name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="py-2">
              <FormField
                name="lastName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        className="form-input"
                        placeholder="Last name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}

        <div className="py-2">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    className="form-input"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="py-2">
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="inline-flex w-full items-center relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="form-input"
                      placeholder="Password"
                      {...field}
                    />
                    <div
                      onClick={handleShowPassword}
                      className="absolute right-6"
                    >
                      {showPassword ? (
                        <EyeClosedIcon className="w-6 h-6 text-APP_GREEN" />
                      ) : (
                        <EyeOpenIcon className="w-6 h-6 text-APP_GREEN" />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-2 w-full items-center">
          <Button type="submit" className="form-btn" size="lg">
            {SIGN_UP ? "sign up" : "sign in"}

            {form.formState.isSubmitting && <Spinner />}
          </Button>
          <span>
            {SIGN_UP
              ? "Already have an account ? "
              : "Don't have an account ? "}

            <Link
              className="text-green-700 hover:text-green-400"
              href={SIGN_UP ? `/auth/sign-in` : "/auth/sign-up"}
            >
              {SIGN_UP ? "sign-in" : "sign-up"}
            </Link>
          </span>
        </div>
      </form>
      {error && <p className="text-sm text-red-500 py-2"> {error}</p>}
    </Form>
  );
};

export default AuthForm;
