"use client";

import { motion } from "framer-motion";
import React from "react";
import { RichText } from "@/components/RichText/RichText";
import { DocumentRendererProps } from "@keystatic/core/renderer";
import { ArrowUpRight } from "@/components/Icons/Icons";
import { cn } from "@/lib/utils";
import { H4 } from "@/components/Typography/H4";
import { documentHasContent } from "@/helpers/documentHasContent";

interface ExperienceCardProps {
  role: string | null;
  company: string | null;
  companyUrl?: string | null;
  companyLocation?: string | null;
  startDate: string | null;
  endDate: string | null;
  current: boolean;
  impact: DocumentRendererProps["document"];
  isFirst: boolean;
  isLast: boolean;
  isSingle: boolean;
}

export function ExperienceCard({
  role,
  company,
  companyUrl,
  companyLocation,
  startDate,
  endDate,
  current,
  impact,
  isFirst,
  isLast,
  isSingle,
  isOpen,
  onToggle,
}: ExperienceCardProps & { isOpen: boolean; onToggle: () => void }) {
  const formatExperienceDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  const hasContent = documentHasContent(impact);

  return (
    <div className={cn("group flex gap-2 relative", !isLast && "pb-4")}>
      {!isSingle && (
        <div className="relative -ml-6 flex w-4 shrink-0 flex-col items-center">
          <div
            className={cn(
              "absolute left-1/2 w-px -translate-x-1/2 transition-colors duration-300",
              isOpen
                ? "bg-shadow-grey-900 dark:bg-shadow-grey-50"
                : "bg-shadow-grey-200 dark:bg-shadow-grey-800",
              isFirst ? "top-8" : "top-0",
              !isLast ? "-bottom-8" : "h-8",
            )}
          />
          <div
            className={cn(
              "relative z-10 mt-8 h-3 w-3 rounded-full ring-4 transition-colors duration-300",
              isOpen
                ? "bg-shadow-grey-900 ring-shadow-grey-50 dark:bg-shadow-grey-50 dark:ring-shadow-grey-900"
                : "bg-shadow-grey-300 ring-white dark:bg-shadow-grey-600 dark:ring-shadow-grey-950",
            )}
          />
        </div>
      )}

      <div
        className={cn(
          "relative flex-1 cursor-pointer p-6 transition-all duration-300",
          isOpen && "rounded-2xl bg-shadow-grey-50 dark:bg-shadow-grey-900",
          !isOpen && hasContent && "rounded-2xl hover:bg-shadow-grey-50/70 dark:hover:bg-shadow-grey-900/50",
        )}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <H4>{role}</H4>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-shadow-grey-600 dark:text-shadow-grey-300">
              {companyUrl ? (
                <a
                  href={companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-shadow-grey-900 hover:underline dark:text-shadow-grey-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  {company}
                  <ArrowUpRight size={14} className="" />
                </a>
              ) : (
                <span className="font-medium text-shadow-grey-900 dark:text-shadow-grey-50">
                  {company}
                </span>
              )}
              {companyLocation && (
                <>
                  <span className="text-shadow-grey-300 dark:text-shadow-grey-600">•</span>
                  <span className="">{companyLocation}</span>
                </>
              )}
            </div>
          </div>

          <div className="shrink-0 text-sm text-shadow-grey-500 dark:text-shadow-grey-400 tabular-nums">
            {formatExperienceDate(startDate)} —{" "}
            {current ? "Present" : formatExperienceDate(endDate)}
          </div>
        </div>

        {hasContent && (
          <motion.div
            initial={false}
            animate={{ height: isOpen ? "auto" : 32 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
              "relative mt-6 overflow-hidden",
              !isOpen &&
                "[mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)]",
            )}
          >
            <RichText
              document={impact}
              paragraphClassName="mt-3 first:mt-0 text-sm md:text-base"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
