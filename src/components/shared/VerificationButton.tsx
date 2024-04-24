"use client";

import { verifyContribution } from "@/lib/actions/contribution.action";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { useState } from "react";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";
import { VerificationProps } from "@/types";
import { ButtonGradientWrapper } from "../blocks/ButtonGradientWrapper";

const VerificationButton = ({
  id,
  userId,
  isVerified,
  sessionUserId,
}: VerificationProps) => {
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
      if (userId === sessionUserId) router.replace(`/profile/${userId}`);
    } catch (error) {
      setSubmitting(false);

      throw new Error("Could not verify contribution.");
    }
  };

  return (
    <ButtonGradientWrapper>
      <Button
        size="lg"
        className="btn"
        disabled={submitting}
        onClick={handleVerification}
      >
        Verify {submitting && <Spinner />}
      </Button>
    </ButtonGradientWrapper>
  );
};

export default VerificationButton;
