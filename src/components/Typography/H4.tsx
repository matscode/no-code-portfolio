import React from "react";
import { cn } from "@/lib/utils";

export function H4({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={cn(
        "text-lg font-medium tracking-tight text-shadow-grey-900 dark:text-shadow-grey-50",
        className,
      )}
      {...props}
    >
      {children}
    </h4>
  );
}
