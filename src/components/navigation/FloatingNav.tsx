"use client";

import { useEffect, useState } from "react";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import { cn } from "@/lib/utils";
import { motion, LayoutGroup } from "framer-motion";

interface FloatingNavProps {
  links: readonly {
    label: string;
    url: string;
    targetBlank?: boolean;
  }[];
}

export function FloatingNav({ links }: FloatingNavProps) {
  const [activeHash, setActiveHash] = useState("/");

  useEffect(() => {
    // Initial check
    const handleHashChange = () => {
      setActiveHash(window.location.hash || "/");
    };
    
    // Set initial state
    handleHashChange();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newSection = entry.target.id;
            const newHash = newSection === "home" ? "/" : `#${newSection}`;
            
            setActiveHash(newHash);
            
            const currentPath = window.location.pathname + window.location.hash;
            if (currentPath !== newHash) {
              window.history.replaceState(null, "", newHash);
            }
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    links.forEach((link) => {
      const url = link.url;
      let sectionId = "";

      if (url === "/" || url === "") {
        sectionId = "home";
      } else if (url.includes("#")) {
        sectionId = url.split("#")[1];
      }

      if (!sectionId) return;

      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [links]);

  return (
    <div className="fixed top-4 left-1/2 z-50 flex w-fit -translate-x-1/2 flex-nowrap items-center gap-2">
      <nav className="squircle-sm relative inline-flex w-fit flex-nowrap items-center gap-1 border border-shadow-grey-200 bg-white/80 p-1 backdrop-blur-sm dark:border-shadow-grey-800 dark:bg-shadow-grey-950/80">
        <LayoutGroup>
          {links.map((link) => {
            const isActive = activeHash === (link.url === "/" ? "/" : link.url.substring(link.url.indexOf("#")));
            
            return (
              <a
                key={link.label}
                href={link.url}
                target={link.targetBlank ? "_blank" : undefined}
                rel={link.targetBlank ? "noopener noreferrer" : undefined}
                className={cn(
                  "squircle-sm relative inline-flex items-center px-3 py-2 text-sm font-medium transition-colors",
                  isActive 
                    ? "text-shadow-grey-900 dark:text-shadow-grey-50" 
                    : "text-shadow-grey-600 hover:bg-shadow-grey-100 hover:text-shadow-grey-900 dark:text-shadow-grey-400 dark:hover:bg-shadow-grey-900 dark:hover:text-white"
                )}
                onClick={(e) => {
                  if (!link.targetBlank && link.url.startsWith("/#")) {
                    e.preventDefault();
                    const id = link.url.split("#")[1];
                    const element = document.getElementById(id);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                      window.history.pushState(null, "", link.url);
                      setActiveHash(`#${id}`);
                    }
                    return;
                  }

                  if (link.url === "/") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    window.history.pushState(null, "", "/");
                    setActiveHash("/");
                  }
                }}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute inset-x-2 -bottom-[5px] h-0.5 rounded-full bg-shadow-grey-900 dark:bg-shadow-grey-50"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  />
                )}
              </a>
            );
          })}
        </LayoutGroup>
      </nav>

      <ThemeToggleButton />
    </div>
  );
}
