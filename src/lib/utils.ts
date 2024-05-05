import { type ClassValue, clsx } from "clsx";
import { SessionOptions } from "iron-session";
import { twMerge } from "tailwind-merge";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { StatementProp } from "@/types";
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
  // regId?: string;
  firstName?: string;
  // lastName?: string;
  role?: string;
  // phone?: string | number;
  // email?: string;
  // image?: string;
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

// Naira formatting
export const formatNaira = (amount: number) => {
  return new Intl.NumberFormat("en-Us", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(amount);
};

// Date and time formatting
export const formatDateTime = (date: Date) => {
  const formattedDate = new Intl.DateTimeFormat("en-Us", {
    dateStyle: "short",
    timeStyle: "short",
    // timeZone: "GMT+1",
    // timeZoneName: "short",
  }).format(date);

  return formattedDate;
};

export const generateRandomNumber = (): string => {
  // const min = 10000;
  // const max = 99999;
  // const randNum = Math.floor(Math.random() * (max - min + 1)) + min;

  const randNum = crypto.randomUUID().slice(0, 5);
  return randNum;
};

// GENERATE PDF
export const generatePDF = (
  statements: StatementProp[],
  sum = 0,
  from: string,
  to: string
) => {
  const doc = new jsPDF();
  doc.setFontSize(16);

  const tableColumn: string[] = [
    "Id",
    "Contribution ID",
    "Plan",
    "Amount",
    "Status",
    "Contribution Date",
  ];
  const footer: (string | number | boolean)[] = [
    "Between",
    from,
    "-",
    to,
    "Total",
    formatNaira(sum),
  ];
  const tableRows: any[] = [];
  statements.map((statement: StatementProp, index: number) => {
    const date = new Date(statement.dateOfContribution);
    let initial: number = 1;

    const row: (string | number | boolean)[] = [
      initial++,
      statement.contributionId,
      statement.plan,
      statement.amount,
      statement.verifiedContribution,
      formatDateTime(date),
    ];

    tableRows.push(row);
  });

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    foot: [footer],
    startY: 20, // margin-top
  });

  const date = new Date();
  doc.text(`Your savings so far`, 14, 15);
  // File name
  doc.save(`statement_from:_${from}_to:_${to}.pdf`);
};

// STYLES
export const success = { backgroundColor: "lightGreen", color: "black" };
export const error = { backgroundColor: "red", color: "white" };

// GENERATE OTP
export const generateOTP = (otp_length = 6) => {
  let OTP = "";
  for (let i = 1; i <= otp_length; i++) {
    // const rand = crypto.getRandomValues()
    const randomVal = Math.round(Math.random() * 9);
    OTP += randomVal;
  }
  return OTP;
};

export const baseUrl =
  "https://res.cloudinary.com/dbb2hbxkn/image/upload/v1712560478/";
