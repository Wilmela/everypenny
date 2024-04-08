"use client";

import { verifyContribution } from "@/lib/actions/contribution.action";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { useState } from "react";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
  userId: string;
  isVerified: boolean;
};
const VerificationButton = ({ id, userId, isVerified }: Props) => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleVerification = async () => {
    setSubmitting(true);
    try {
      const res = await verifyContribution(id, userId, isVerified);
      if (res?.error) {
        toast({
          title: res.error,
          description: "Error why verifying contribution",
          variant: "destructive",
          duration: 3000,
        });
      }
      toast({
        title: "Verified",
        description: "Last contribution verified",
        variant: "default",
        duration: 3000,
      });
      setSubmitting(false);
      router.replace(`/profile/${userId}`);
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
