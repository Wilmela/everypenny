"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { UpdateUserProps } from "@/types";
import { UpdateUserSchema, UpdateUserType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageUploader from "./ImageUploader";
import { useState } from "react";
import Spinner from "./Spinner";
import { updateUserById } from "@/lib/actions/user.action.";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { success, error, baseUrl, SessionData } from "@/lib/utils";
import Image from "next/image";
import { ButtonGradientWrapper } from "../blocks/ButtonGradientWrapper";

const UserUpdateForm = ({
  user,
  session,
}: {
  user: UpdateUserProps;
  session: SessionData;
}) => {
  const form = useForm<UpdateUserType>({
    defaultValues: user,
    resolver: zodResolver(UpdateUserSchema),
  });

  const imageLink = `${baseUrl}/${user?.imageUrl}`;

  const [imgUrl, setImgUrl] = useState("");

  const router = useRouter();

  const onSubmit = async (data: UpdateUserType) => {
    const updatedUser = await updateUserById(user._id, data, user.imageUrl);

    if (updatedUser?.error) {
      toast({
        title: updatedUser.error,
        description: "Failed to update user",
        variant: "destructive",
        style: error,
      });
    } else {
      toast({
        title: "Updated.",
        description: "User updated successfully",
        variant: "default",
        style: success,
      });
      if (user._id === session?.userId) {
        router.replace(`/profile/${user._id}`);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full md:w-6/12 lg:w-5/12"
      >
        <div className="my-2 flex items-center justify-between w-full max-h-[270px] rounded-md overflow-hidden">
          <FormField
            name="imageUrl"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUploader
                    publicId={field.value}
                    onValueChange={(e) => field.onChange(e)}
                    setImgUrl={setImgUrl}
                    imgUrl={imgUrl}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Image
            src={!user.imageUrl ? "/assets/images/dp.jpeg" : imageLink}
            alt="users"
            width={200}
            height={200}
          />
        </div>
        <div className="my-2">
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="first name"
                    className="form-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="my-2">
          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Last name"
                    className="form-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="my-2">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="form-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="my-2">
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Phone"
                    className="form-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <ButtonGradientWrapper>
          <Button
            className="form-btn"
            size="lg"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            Update
            {form.formState.isSubmitting && (
              <Spinner className="text-green-700" />
            )}
          </Button>
        </ButtonGradientWrapper>
      </form>
    </Form>
  );
};

export default UserUpdateForm;
