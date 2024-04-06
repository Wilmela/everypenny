"use client";
import MaxWidthContainer from "@/components/shared/MaxWidthContainer";
import { Button } from "@/components/ui/button";
import React from "react";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <MaxWidthContainer className="flex flex-col gap-2 w-full h-[calc(100vh-30vh)] justify-center items-center">
      <h2 className="page-title">An error occurred</h2>
      <p className="text-red-500 max-w-[35ch] items-center">{error.message}</p>
      <Button className="btn" onClick={() => reset()}>
        Retry
      </Button>
    </MaxWidthContainer>
  );
};

export default Error;
