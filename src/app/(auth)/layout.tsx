import MaxWidthContainer from "@/components/shared/MaxWidthContainer";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Auth",
  description: "Authentication",
};
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default AuthLayout;
