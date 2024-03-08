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
import { SignInSchema, SignInType } from "@/lib/validation";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { signIn } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import { cn } from "@/lib/utils";

const SigInForm = () => {
  const router = useRouter();
  const initialValue = { email: "", password: "" };

  const form = useForm<SignInType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: initialValue,
  });

  const onSubmit = async ({ email, password }: SignInType) => {
    try {
      await signIn({ email, password });
      router.push("/");
    } catch (error) {
      throw error;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="form">
        <div className="py-1">
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
                  <Input
                    type="password"
                    className="form-input"
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-2 w-full items-center">
          <Button
            type="submit"
            className={cn("form-btn", {
              "cursor-not-allowed": form.formState.isSubmitting,
            })}
            size="lg"
          >
            Sign in
            {form.formState.isSubmitting && <Spinner />}
          </Button>
          <span>
            You don&apos;t have an account ?{" "}
            <Link
              className={cn("text-green-700 hover:text-green-400", {
                "cursor-not-allowed": form.formState.isSubmitting,
              })}
              href="/auth/sign-up"
            >
              sign-up
            </Link>
          </span>
        </div>
      </form>
    </Form>
  );
};

export default SigInForm;
