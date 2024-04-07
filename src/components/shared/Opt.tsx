"use client";

import { verifyUser } from "@/lib/actions/user.action.";
import { OtpInput } from "reactjs-otp-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OtpSchema, OtpType } from "@/lib/validation";

const Opt = () => {
  const initialValue = { otp: "" };

  const form = useForm<OtpType>({
    defaultValues: initialValue,
    resolver: zodResolver(OtpSchema),
  });

  const onSubmit = async (data: OtpType) => {
    await verifyUser(data.otp);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <p className="p-text text-center mb-4">Verify to continue</p>
        <FormField
          name="otp"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <OtpInput
                  value={field.value}
                  onChange={(otp: string) => field.onChange(otp)}
                  numInputs={6}
                  separator={<span>-</span>}
                  containerStyle={{
                    // backgroundColor: "green",
                    padding: 10,
                    borderColor: "green",
                    borderWidth: "1px",
                    borderRadius: 10,
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size="lg" className="btn mt-4" type="submit">
          Continue
        </Button>
      </form>
    </Form>
  );
};

export default Opt;
