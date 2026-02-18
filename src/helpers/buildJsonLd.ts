import type { ProfileEntry, SocialLinksEntry } from "@/lib/keystatic";

export function buildJsonLd({
  profile,
  socialLinks,
  description,
}: {
  profile: ProfileEntry | null;
  socialLinks: SocialLinksEntry | null;
  description: string;
}) {
  const appUrl = process.env.NEXT_PUBLIC_NCP_APP_URL || "http://localhost:3000";

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: profile?.name || "Your Name",
      jobTitle: profile?.title || "Who Are You?",
      description,
      url: appUrl,
      image: profile?.photo ? `${appUrl}${profile.photo}` : undefined,
      sameAs: socialLinks?.links?.map((link) => link.url) || [],
    },
  };
}
