"use client";

import { verifyContribution } from "@/lib/actions/contribution.action";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { useState } from "react";
import Spinner from "./Spinner";

type Props = {
  id: string;
  userId: string;
};
const VerificationButton = ({ id, userId }: Props) => {
  const [submitting, setSubmitting] = useState(false);

  console.log(id);
  
  const handleVerification = async () => {
    setSubmitting(true);
    try {
      const res = await verifyContribution(id, userId);
      if (res?.error) {
        toast({
          title: res.error,
          description: "Error why verifying contribution",
          variant: "destructive",
        });
      }
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);

      throw new Error("Could not verify contribution.");
    }
  };

  return (
    <Button
      size="lg"
      className="btn"
      disabled={submitting}
      onClick={handleVerification}
    >
      Verify {submitting && <Spinner />}
    </Button>
  );
};

export default VerificationButton;
