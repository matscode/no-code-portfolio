import React from "react";
import { cn } from "@/lib/utils";

export function H3({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-xl font-semibold tracking-tight text-shadow-grey-900 dark:text-shadow-grey-50",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
}
