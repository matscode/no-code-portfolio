import React from "react";
import { cn } from "@/lib/utils";

export function Link({ children, className, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      className={cn(
        "font-medium text-shadow-grey-900 underline underline-offset-4 decoration-shadow-grey-300 transition-colors hover:decoration-shadow-grey-900 dark:text-shadow-grey-50 dark:decoration-shadow-grey-700 dark:hover:decoration-shadow-grey-200",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
