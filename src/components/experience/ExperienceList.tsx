"use client";

import { useState } from "react";
import { ExperienceCard } from "./ExperienceCard";
import { DocumentRendererProps } from "@keystatic/core/renderer";

interface ExperienceItem {
  slug: string;
  entry: {
    role: string | null;
    company: string | null;
    companyUrl?: string | null;
    companyLocation?: string | null;
    startDate: string | null;
    endDate: string | null;
    current: boolean;
  };
  impact: DocumentRendererProps["document"];
}

interface ExperienceListProps {
  items: ExperienceItem[];
}

export function ExperienceList({ items }: ExperienceListProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.slug ?? null);

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="">
      {items.map((job, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        const isSingle = items.length === 1;

        return (
          <div key={job.slug}>
            <ExperienceCard
              role={job.entry.role}
              company={job.entry.company}
              companyUrl={job.entry.companyUrl}
              companyLocation={job.entry.companyLocation}
              startDate={job.entry.startDate}
              endDate={job.entry.endDate}
              current={job.entry.current}
              impact={job.impact}
              isFirst={isFirst}
              isLast={isLast}
              isSingle={isSingle}
              isOpen={openId === job.slug}
              onToggle={() => handleToggle(job.slug)}
            />
          </div>
        );
      })}
    </div>
  );
}
