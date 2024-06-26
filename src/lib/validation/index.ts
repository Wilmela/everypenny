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
  imageUrl: z.any(),
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

export const SearchSchema = z.object({
  search: z.string().min(2, {
    message: "too short",
  }),
});
export type SearchType = z.infer<typeof SearchSchema>;

export const OtpSchema = z.object({
  otp: z
    .string()
    .min(6, {
      message: "not less than 6 character short",
    })
    .max(6, {
      message: "not more than 6 character short",
    }),
});
export type OtpType = z.infer<typeof OtpSchema>;

// UPDATE USER
export const UpdateUserSchema = z.object({
  firstName: z.string().min(4, {
    message: "not less than 4 character short",
  }),
  lastName: z.string().min(4, {
    message: "not less than 4 character short",
  }),
  email: z.string().email().min(4, {
    message: "not less than 4 character short",
  }),
  phone: z.string().min(6, {
    message: "not less than 6 character short",
  }),

  imageUrl: z.any(),
});
export type UpdateUserType = z.infer<typeof UpdateUserSchema>;
