import { type ClassValue, clsx } from "clsx";
import { SessionOptions } from "iron-session";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Oops, something went wrong.";
  }
  return message;
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
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (date: Date) => {
  const formattedDate = Intl.DateTimeFormat("en-Us", {
    dateStyle: "short",
    timeStyle: "short",
    // timeZone: "GMT+1",
    // timeZoneName: "short",
  }).format(date);

  return formattedDate;
};

export const generateRandomNumber = (): number => {
  const min = 10000;
  const max = 99999;
  const randNum = Math.floor(Math.random() * (max - min + 1)) + min;

  return randNum;
};
