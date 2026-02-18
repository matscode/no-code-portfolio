import React from "react";
import { cn } from "@/lib/utils";

export function H2({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 
      className={cn(
        "text-2xl font-semibold tracking-tight md:text-3xl",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}
