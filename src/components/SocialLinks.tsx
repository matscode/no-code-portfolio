import {
  type SocialLinksEntry,
} from "@/lib/keystatic";
import { getSocialIcon } from "@/lib/social-icons";

interface SocialLinksProps {
  links: NonNullable<SocialLinksEntry>["links"];
  displayMode?: "icon" | "text" | "both" | null;
}

export function SocialLinks({ links, displayMode }: SocialLinksProps) {
  if (!links || links.length === 0) return null;

  return (
    <>
      {links.map((link) => {
        if (!link.url) return null;
        const { icon: Icon, label } = getSocialIcon(link.url);
        const resolvedDisplayMode = displayMode || "icon";
        const showIcon = resolvedDisplayMode === "icon" || resolvedDisplayMode === "both";
        const showText = resolvedDisplayMode === "text" || resolvedDisplayMode === "both";

        return (
          <a
            key={link.url}
            href={link.url}
            target={link.openExternal ? "_blank" : undefined}
            rel={link.openExternal ? "noopener noreferrer" : undefined}
            className="squircle-sm inline-flex items-center gap-2 bg-shadow-grey-100 px-4 py-3 text-sm font-medium text-shadow-grey-700 transition-colors hover:bg-shadow-grey-200 hover:text-shadow-grey-900 dark:bg-shadow-grey-800 dark:text-shadow-grey-300 dark:hover:bg-shadow-grey-700 dark:hover:text-shadow-grey-50"
            aria-label={label}
          >
            {showIcon && (
              <Icon
                size={resolvedDisplayMode === "icon" ? 32 : 24}
                weight="regular"
                className=""
              />
            )}
            {showText && <span className="">{label}</span>}
          </a>
        );
      })}
    </>
  );
}
