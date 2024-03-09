import { type ClassValue, clsx } from "clsx";
import { SessionOptions } from "iron-session";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = (error: Error | any) => {
  if (typeof error === "string") return { error };

  return JSON.stringify({ error });
};

// IRON-SESSION CONFIG - These are params you want the session to hold
export interface SessionData {
  userId?: string;
  regId?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  email?: string;
  image?: string;
  isLoggedIn: boolean;
}
export const defaultSession: SessionData = {
  firstName: "",
  isLoggedIn: false,
};
export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_KEY!,
  cookieName: "every-penny",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};

// Date and Time formatting
export const formatNaira = (amount: number) => {
  return Intl.NumberFormat("en-Us", {
    style: "currency",
    currency: "Naira",
    maximumFractionDigits: 2,
  }).format(amount);

};

export const formatDate = (date: Date) => {
  const formattedDate = Intl.DateTimeFormat("en-Us", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "GMT+1",
    timeZoneName: "short",
  }).format(date);

  return formattedDate;
};
