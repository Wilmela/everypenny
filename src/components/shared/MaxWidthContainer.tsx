import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function MaxWidthContainer({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "w-full px-6 sm:px-8 lg:px-12 max-w-screen-2xl mx-auto",
        className
      )}
    >
      {children}
    </section>
  );
}
