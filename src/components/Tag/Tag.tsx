import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "squircle-sm inline-flex items-center bg-shadow-grey-100 px-3 py-1.5 text-sm font-medium text-shadow-grey-700 dark:bg-shadow-grey-800 dark:text-shadow-grey-300",
        className,
      )}
    >
      {children}
    </span>
  );
}
