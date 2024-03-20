"use client";
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
    <div className="flex flex-col gap-2 w-full h-screen justify-center items-center">
      <h2 className="page-title">An error occurred</h2>
      <p className="text-red-500 max-w-[35ch] items-center">{error.message}</p>
      <Button className="w-fit p-4" onClick={() => reset()}>
        Retry
      </Button>
    </div>
  );
};

export default Error;
