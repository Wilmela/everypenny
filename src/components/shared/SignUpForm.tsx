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
import { CreateUserSchema, CreateUserType } from "@/lib/validation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/user.action.";
import { initialValue } from "@/constants";
import Spinner from "./Spinner";

const SigUpForm = () => {
  const router = useRouter();
  const form = useForm<CreateUserType>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: initialValue,
  });

  const onSubmit = async ({
    firstName,
    lastName,
    email,
    password,
  }: CreateUserType) => {
    try {
      const newUser = await createUser({
        firstName,
        lastName,
        email,
        password,
      });
      if (newUser) {
        console.log("New user created.");

        router.push("/auth/sign-in");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="form">
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
          <Button type="submit" className="form-btn" size="lg">
            Sign up
            {form.formState.isSubmitting && <Spinner />}
          </Button>
          <span>
            Already have an account ?{" "}
            <Link
              className="text-green-700 hover:text-green-400"
              href="/auth/sign-in"
            >
              sign-in
            </Link>
          </span>
        </div>
      </form>
    </Form>
  );
};

export default SigUpForm;
