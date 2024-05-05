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
import { handleError } from "@/lib/utils";
import { createPlan } from "@/lib/actions/plan.action";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import { ButtonGradientWrapper } from "../blocks/ButtonGradientWrapper";

const PlanCustomizationForm = ({
  userId,
  type,
  duration,
}: {
  userId: string;
  type: string;
  duration: string;
}) => {
  const initialValue = { step: "", amount: 0 };

  const form = useForm<CustomPlanType>({
    resolver: zodResolver(CustomPlanSchema),
    defaultValues: initialValue,
  });

  const router = useRouter();

  // Suggested Amount
  const onSubmit = async (data: CustomPlanType) => {
    if (!data.amount && !data.step) return;
    // const formattedAmount = formatNaira(amount);

    try {
      const newSub = await createPlan({
        ...data,
        type,
        duration,
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

        <ButtonGradientWrapper>
          <Button type="submit" className="form-btn" disabled={form.formState.isSubmitting}>
            Start {form.formState.isSubmitting && <Spinner />}
          </Button>
        </ButtonGradientWrapper>
      </form>
    </Form>
  );
};

export default PlanCustomizationForm;
