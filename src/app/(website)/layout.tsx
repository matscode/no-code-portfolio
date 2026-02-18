import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { reader } from "@/lib/keystatic";
import "./globals.css";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { FloatingNav } from "@/components/navigation/FloatingNav";
import { ThemeProvider } from "@/components/ThemeProvider";
import { extractTextFromKeystatic } from "@/lib/utils";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const profile = await reader.singletons.profile.read();
  const profileSummary = profile?.summary ? await profile.summary() : [];
  const baseUrl = process.env.NEXT_PUBLIC_NCP_APP_URL || 'http://localhost:3000';
  
  const bioText = extractTextFromKeystatic(profileSummary);
  const description = bioText.length > 0 
    ? bioText.replace(/\n/g, ' ').trim()
    : "";

  const imageUrl = profile?.photo ? `${baseUrl}${profile.photo}` : undefined;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: `${profile?.name || "Your Name"} | ${profile?.title || "Who Are You?"}`,
      template: `%s | ${profile?.name || "Your Name"}`,
    },
    alternates: {
      types: {
        "text/plain": [{ url: "/llms.txt", title: "llms.txt" }],
      },
    },
    description: description,
    openGraph: {
      title: `${profile?.name || "Your Name"} | ${profile?.title || "Who Are You?"}`,
      description: description,
      url: baseUrl,
      siteName: profile?.name || "Your Name",
      locale: 'en_US',
      type: 'website',
      images: imageUrl ? [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: profile?.name || "Your Name",
        }
      ] : [],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    twitter: {
      title: profile?.name || "Your Name",
      card: 'summary_large_image',
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = await reader.singletons.siteConfig.read();
  const globalNav = await reader.singletons.globalNav.read();
  const analytics = await reader.singletons.analytics.read();
  const navLinks = globalNav?.links ?? [];
  const hasNav = Boolean(globalNav?.enableNavigation && navLinks.length > 0);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={dmSans.className}>
        {analytics?.googleTagManagerId && (
          <GoogleTagManager gtmId={analytics.googleTagManagerId} />
        )}
        <ThemeProvider
          attribute="class"
          defaultTheme={siteConfig?.defaultTheme || "system"}
          enableSystem
          disableTransitionOnChange
        >
          {hasNav && <FloatingNav links={navLinks} />}
          <div>{children}</div>
          {analytics?.googleAnalyticsId && (
            <GoogleAnalytics gaId={analytics.googleAnalyticsId} />
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
