import { createReader } from '@keystatic/core/reader';
import { createGitHubReader } from '@keystatic/core/reader/github';
import { Entry } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

// 1. Create the reader
const storageKind = process.env.NEXT_PUBLIC_NCP_STORAGE_KIND?.trim().toLowerCase() || 'github';
const githubToken = process.env.NCP_GITHUB_TOKEN;

export const reader = (storageKind === 'github' && githubToken)
  ? createGitHubReader(keystaticConfig, {
      repo: `${process.env.NEXT_PUBLIC_NCP_GITHUB_USERNAME}/${process.env.NEXT_PUBLIC_NCP_REPO_NAME || 'no-code-portfolio'}` as `${string}/${string}`,
      ref: 'k/main',
      token: githubToken,
    })
  : createReader(process.cwd(), keystaticConfig);

// 2. Infer types from the config
export type KeystaticConfig = typeof keystaticConfig;

// 3. Helper types for specific collections/singletons
// These will be fully typed based on your schema!
export type WorkExperienceEntry = Entry<KeystaticConfig['collections']['workExperience']>;
export type ProjectEntry = Entry<KeystaticConfig['collections']['projects']>;
export type OpenSourceEntry = Entry<KeystaticConfig['collections']['openSource']>;
export type ArticleEntry = Entry<KeystaticConfig['collections']['articles']>;

export type ProfileEntry = Entry<KeystaticConfig['singletons']['profile']>;
export type ContactEntry = Entry<KeystaticConfig['singletons']['contact']>;
export type SocialLinksEntry = Entry<KeystaticConfig['singletons']['socialLinks']>;
export type FeaturesEntry = Entry<KeystaticConfig['singletons']['features']>;
export type AnalyticsEntry = Entry<KeystaticConfig['singletons']['analytics']>;
export type SiteConfigEntry = Entry<KeystaticConfig['singletons']['siteConfig']>;
export type GlobalNavEntry = Entry<KeystaticConfig['singletons']['globalNav']>;
