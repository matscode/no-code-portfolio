import React from "react";
import { cn } from "@/lib/utils";

export function Text({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-base leading-relaxed text-shadow-grey-600 dark:text-shadow-grey-300", className)}
      {...props}
    >
      {children}
    </p>
  );
}
