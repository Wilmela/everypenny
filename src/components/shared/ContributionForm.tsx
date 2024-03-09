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
import { formatDate } from "@/lib/utils";

type Props = {
  contributor: string;
  plan: string;
};
const ContributionForm = ({ contributor, plan }: Props) => {
  const form = useForm<ContributionType>({
    defaultValues: { amount: "", date: new Date() },
    resolver: zodResolver(ContributionSchema),
  });

  const onSubmit = async (data: ContributionType) => {
    try {
      const contribution = await makeContribution(
        {
          ...data,
          receipt: "http://localhost.com",
          contributor,
          plan,
          dateOfContribution: formatDate(data.date),
          verifiedContribution: false,
        },
        `/profile/${contributor}`
      );

      if (contribution) {
        console.log("Contribution awaiting verification, thank you.");
      }
    } catch (error) {
      throw error;
    }
  };
  
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-2"
      >
        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
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
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="file"
                  {...field}
                  className="form-input"
                  placeholder="Receipt"
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
                  dateFormat="MM/dd/yyyy h:mm aa"
                  // wrapperClassName=''
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="form-btn">
          {form.formState.isSubmitting && <Spinner />}
          Contribute
        </Button>
      </form>
    </Form>
  );
};

export default ContributionForm;
