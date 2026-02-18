"use client";

import { Envelope } from "@/components/Icons/Icons";
import { cn } from "@/lib/utils";

interface ObfuscatedEmailProps {
  email: string;
  label?: string;
}

export function ObfuscatedEmail({ email, label = "Send an Email" }: ObfuscatedEmailProps) {
  const handleClick = () => {
    window.open(`mailto:${email}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "squircle-sm inline-flex items-center gap-2 border border-shadow-grey-200 bg-shadow-grey-900 px-6 py-4 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-shadow-grey-800 dark:border-shadow-grey-800 dark:bg-white dark:text-shadow-grey-950 dark:hover:bg-shadow-grey-100",
      )}
    >
      <Envelope size={24} className="" />
      <span className="">{label}</span>
    </button>
  );
}
