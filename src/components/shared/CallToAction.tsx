import Link from "next/link";
import { Button } from "../ui/button";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ButtonGradientWrapper } from "../blocks/ButtonGradientWrapper";

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 md:gap-2 md:justify-center lg:justify-start">
      <ButtonGradientWrapper>
        <Button size="lg" className="btn" asChild variant="default">
          <Link href="#explore">Explore</Link>
        </Button>
      </ButtonGradientWrapper>

        <Button
          size="lg"
          className="btn hover:text-green-700"
          asChild
          variant="ghost"
        >
          <Link href="/plan">Save &rarr;</Link>
        </Button>
    </div>
  );
};

export default CallToAction;

