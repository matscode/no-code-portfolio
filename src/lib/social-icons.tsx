import {
  GithubLogo,
  LinkedinLogo,
  XLogo,
  InstagramLogo,
  YoutubeLogo,
  DiscordLogo,
  DribbbleLogo,
  BehanceLogo,
  MediumLogo,
  DevToLogo,
  FacebookLogo,
  TwitchLogo,
  RedditLogo,
  SlackLogo,
  TelegramLogo,
  WhatsappLogo,
  FigmaLogo,
  NotionLogo,
  PinterestLogo,
  SpotifyLogo,
  TiktokLogo,
  ThreadsLogo,
  MastodonLogo,
  PatreonLogo,
  CodepenLogo,
  CodesandboxLogo,
  GitlabLogo,
  StackOverflowLogo,
  GoodreadsLogo,
  SnapchatLogo,
  SoundcloudLogo,
  StripeLogo,
  TumblrLogo,
  WechatLogo,
  ReadCvLogo,
  Globe,
  Envelope,
} from "@/components/Icons/Icons";

export function getSocialIcon(url: string) {
  const lowerUrl = url.toLowerCase();
  
  if (lowerUrl.includes("github.com")) return { icon: GithubLogo, label: "GitHub" };
  if (lowerUrl.includes("linkedin.com")) return { icon: LinkedinLogo, label: "LinkedIn" };
  if (lowerUrl.includes("twitter.com") || lowerUrl.includes("x.com")) return { icon: XLogo, label: "X (Twitter)" };
  if (lowerUrl.includes("instagram.com")) return { icon: InstagramLogo, label: "Instagram" };
  if (lowerUrl.includes("youtube.com")) return { icon: YoutubeLogo, label: "YouTube" };
  if (lowerUrl.includes("discord.com") || lowerUrl.includes("discord.gg")) return { icon: DiscordLogo, label: "Discord" };
  if (lowerUrl.includes("dribbble.com")) return { icon: DribbbleLogo, label: "Dribbble" };
  if (lowerUrl.includes("behance.net")) return { icon: BehanceLogo, label: "Behance" };
  if (lowerUrl.includes("medium.com")) return { icon: MediumLogo, label: "Medium" };
  if (lowerUrl.includes("dev.to")) return { icon: DevToLogo, label: "Dev.to" };
  if (lowerUrl.includes("facebook.com")) return { icon: FacebookLogo, label: "Facebook" };
  if (lowerUrl.includes("twitch.tv")) return { icon: TwitchLogo, label: "Twitch" };
  if (lowerUrl.includes("reddit.com")) return { icon: RedditLogo, label: "Reddit" };
  if (lowerUrl.includes("slack.com")) return { icon: SlackLogo, label: "Slack" };
  if (lowerUrl.includes("t.me") || lowerUrl.includes("telegram.org")) return { icon: TelegramLogo, label: "Telegram" };
  if (lowerUrl.includes("whatsapp.com") || lowerUrl.includes("wa.me")) return { icon: WhatsappLogo, label: "WhatsApp" };
  if (lowerUrl.includes("figma.com")) return { icon: FigmaLogo, label: "Figma" };
  if (lowerUrl.includes("notion.so")) return { icon: NotionLogo, label: "Notion" };
  if (lowerUrl.includes("pinterest.com")) return { icon: PinterestLogo, label: "Pinterest" };
  if (lowerUrl.includes("spotify.com")) return { icon: SpotifyLogo, label: "Spotify" };
  if (lowerUrl.includes("tiktok.com")) return { icon: TiktokLogo, label: "TikTok" };
  if (lowerUrl.includes("threads.net")) return { icon: ThreadsLogo, label: "Threads" };
  if (lowerUrl.includes("mastodon.social") || lowerUrl.includes("mstdn.social")) return { icon: MastodonLogo, label: "Mastodon" };
  if (lowerUrl.includes("patreon.com")) return { icon: PatreonLogo, label: "Patreon" };
  if (lowerUrl.includes("codepen.io")) return { icon: CodepenLogo, label: "CodePen" };
  if (lowerUrl.includes("codesandbox.io")) return { icon: CodesandboxLogo, label: "CodeSandbox" };
  if (lowerUrl.includes("gitlab.com")) return { icon: GitlabLogo, label: "GitLab" };
  if (lowerUrl.includes("stackoverflow.com")) return { icon: StackOverflowLogo, label: "Stack Overflow" };
  if (lowerUrl.includes("goodreads.com")) return { icon: GoodreadsLogo, label: "Goodreads" };
  if (lowerUrl.includes("snapchat.com")) return { icon: SnapchatLogo, label: "Snapchat" };
  if (lowerUrl.includes("soundcloud.com")) return { icon: SoundcloudLogo, label: "SoundCloud" };
  if (lowerUrl.includes("stripe.com")) return { icon: StripeLogo, label: "Stripe" };
  if (lowerUrl.includes("tumblr.com")) return { icon: TumblrLogo, label: "Tumblr" };
  if (lowerUrl.includes("wechat.com")) return { icon: WechatLogo, label: "WeChat" };
  if (lowerUrl.includes("read.cv")) return { icon: ReadCvLogo, label: "Read.cv" };
  
  if (lowerUrl.includes("mailto:")) return { icon: Envelope, label: "Email" };
  
  return { icon: Globe, label: "Website" };
}
