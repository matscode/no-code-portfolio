import React from "react";
import { cn } from "@/lib/utils";

export function H1({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "text-4xl font-bold tracking-tight text-shadow-grey-900 md:text-5xl dark:text-shadow-grey-50",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}
