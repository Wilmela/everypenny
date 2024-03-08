"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CustomPlanSchema, CustomPlanType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { formatNaira, handleError } from "@/lib/utils";
import { createPlan } from "@/lib/actions/plan.action";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";

const PlanCustomizationForm = ({
  userId,
  type,
}: {
  userId: string;
  type: string;
}) => {
  const initialValue = { step: "", amount: 0 };

  const form = useForm<CustomPlanType>({
    resolver: zodResolver(CustomPlanSchema),
    defaultValues: initialValue,
  });

  const router = useRouter();

  // Suggested Amount

  const onSubmit = async (data: CustomPlanType) => {
    const { amount, step } = data;
    // const formattedAmount = formatNaira(amount);

    try {
      const newSub = await createPlan({
        step,
        amount,
        type,
        isActive: true,
        subscriber: userId,
      });

      if (newSub) {
        router.push(`/profile/${userId}?type=${type}`);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full md:flex md:w-fit md:gap-4">
          <div className="py-2">
            <FormField
              name="step"
              control={form.control}
              render={({ field }) => {
                const steps = ["Daily", "Weekly", "Monthly"];
                return (
                  <FormItem>
                    <FormControl>
                      <Select name="step" onValueChange={field.onChange}>
                        <SelectTrigger className="w-full md:w-[180px]">
                          <SelectValue placeholder="Interval" />
                        </SelectTrigger>
                        <SelectContent>
                          {steps.map((step) => (
                            <SelectItem key={step} value={step}>
                              {step}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <div className="py-2">
            <FormField
              name="amount"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Amount"
                      // step={1}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit">
          Start {form.formState.isSubmitting && <Spinner />}
        </Button>
      </form>
    </Form>
  );
};

export default PlanCustomizationForm;
