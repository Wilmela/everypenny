"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "@radix-ui/react-icons";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { ContributionSchema, ContributionType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import Spinner from "./Spinner";
import { makeContribution } from "@/lib/actions/contribution.action";
import { useState } from "react";
import ImageUploader from "./ImageUploader";
import { toast } from "../ui/use-toast";
import { success } from "@/lib/utils";
import { ButtonGradientWrapper } from "../blocks/ButtonGradientWrapper";

type Props = {
  contributor: string;
  plan: string;
  chosenAmount: number;
};

const ContributionForm = ({ contributor, plan, chosenAmount }: Props) => {
  const initialsValue = { amount: 0, receipt: "", date: new Date() };

  const form = useForm<ContributionType>({
    defaultValues: chosenAmount
      ? { ...initialsValue, amount: chosenAmount }
      : initialsValue,
    resolver: zodResolver(ContributionSchema),
  });

  const [imgUrl, setImgUrl] = useState("");

  const onSubmit = async (data: ContributionType) => {
    if (imgUrl) {
      try {
        const contribution = await makeContribution(
          contributor,
          {
            ...data,
            receipt: imgUrl || "http://localhost.com",
            contributor,
            plan,
            dateOfContribution: data.date,
            verifiedContribution: false,
          },
          `/profile/${contributor}`
        );

        setImgUrl("");
        if (contribution) {
          toast({
            title: "Successfully uploaded",
            description: "Contribution awaiting verification, thank you.",
            variant: "default",
            style: success,
          });
        }
      } catch (error) {
        throw error;
      }
    }
    return;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled
                  type="text"
                  {...field}
                  className="form-input"
                  placeholder="Amount"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="receipt"
          control={form.control}
          render={({ field }) => (
            <FormItem className="border items-center gap-2 rounded-md">
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

        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem className="inline-flex items-center justify-center gap-2 form-input">
              <CalendarIcon className="w-8 h-8 text-gray-400" />

              <FormControl>
                <DatePicker
                  // className="border-none focus:border-none"
                  selected={field.value}
                  onChange={(date: Date) => field.onChange(date)}
                  // showTimeSelect
                  // timeInputLabel="Time:"
                  dateFormat="MM/dd/yy h:mm aa"
                  disabled
                  // wrapperClassName=''
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ButtonGradientWrapper>
          <Button type="submit" className="form-btn inline-flex gap-2">
            Contribute
            {form.formState.isSubmitting && <Spinner />}
          </Button>
        </ButtonGradientWrapper>
      </form>
    </Form>
  );
};

export default ContributionForm;
