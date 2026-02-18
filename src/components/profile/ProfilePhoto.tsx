import { cn } from "@/lib/utils";

interface ProfilePhotoProps {
  src: string;
  alt: string;
  className?: string;
}

export function ProfilePhoto({ src, alt, className }: ProfilePhotoProps) {
  return (
    <div
      className={cn(
        "squircle aspect-square w-full overflow-hidden border border-shadow-grey-200 bg-white dark:border-shadow-grey-800 dark:bg-shadow-grey-950",
        className,
      )}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover object-center" />
    </div>
  );
}
