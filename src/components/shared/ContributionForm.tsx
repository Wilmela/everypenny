"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ClockIcon } from "@radix-ui/react-icons";

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

const ContributionForm = () => {
  const form = useForm<ContributionType>({
    defaultValues: { amount: "", date: new Date() },
    resolver: zodResolver(ContributionSchema),
  });

  const onSubmit = async () => {};
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
                <Input {...field} className="form-input" />
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
              <ClockIcon className="w-8 h-8 text-gray-400" />

              <FormControl>
                <DatePicker
                  // className="form-input"
                  selected={field.value}
                  onChange={(date: Date) => field.onChange(date)}
                  // showTimeSelect
                  // timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  // wrapperClassName="datePicker"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ContributionForm;
