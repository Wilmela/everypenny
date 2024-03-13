import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "password should be at least 6 character long" }),
});
export type SignInType = z.infer<typeof SignInSchema>;

export const CreateUserSchema = z.object({
  firstName: z
    .string()
    .min(4, { message: "password should be at least 4 character long" }),
  lastName: z
    .string()
    .min(4, { message: "password should be at least 4 character long" }),
  email: z
    .string()
    .email()
    .min(2, { message: "password should be at least 2 character long" }),
  password: z
    .string()
    .min(6, { message: "password should be at least 6 character long" }),
});
export type CreateUserType = z.infer<typeof CreateUserSchema>;

export const CustomPlanSchema = z.object({
  step: z.string(),
  amount: z.union([z.string(), z.number()]),
});
export type CustomPlanType = z.infer<typeof CustomPlanSchema>;

export const ContributionSchema = z.object({
  amount: z.number().min(1000, {
    message: "You can not contribute less than 1000 naira",
  }),

  receipt: z.any(),
  date: z.date(),
});
export type ContributionType = z.infer<typeof ContributionSchema>;
