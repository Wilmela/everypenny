import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const ButtonGradientWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "bg-gradient-to-r from-yellow-200 via-green-300 to-green-600 p-[2px] rounded-full",
      { className }
    )}
  >
    {children}
  </div>
);
