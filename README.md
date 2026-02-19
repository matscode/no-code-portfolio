# No Code Portfolio

A sophisticated personal website optimized for the AI era — launch a premium portfolio and link‑in‑bio in under 30 minutes, 100% free, with no forced branding.

## Use Cases

- Creator link-in-bio for videos, resources, and community links
- Personal portfolio for client work, products, or creative projects
- One-page brand site for agencies, studios, or freelancers
- Lightweight CV site with experience, projects, and contact

## Features

- No-code editing for all content
- Custom sections for projects, experience, and links
- Light and dark themes with polished layouts
- SEO-ready metadata and social sharing
- Fast, mobile-optimized experience

## Deploying Your Personal Website

1. Click Deploy with Vercel to create your own copy and a Vercel project.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/matscode/no-code-portfolio)

1. After the first deploy finishes, open /keystatic on your new site and click Create GitHub App. Choose an app name, confirm, and copy the Client ID, Client Secret, KEYSTATIC_SECRET, and App Slug from the success screen.
1. Add these environment variables in Vercel → Project → Settings → Environment Variables:

```env
NEXT_PUBLIC_NCP_STORAGE_KIND=github
NEXT_PUBLIC_NCP_GITHUB_USERNAME=your-github-username-or-org
NEXT_PUBLIC_NCP_REPO_NAME=your-repo-name
KEYSTATIC_GITHUB_CLIENT_ID=from-github-app
KEYSTATIC_GITHUB_CLIENT_SECRET=from-github-app
KEYSTATIC_SECRET=from-github-app
NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=from-github-app
```

1. Redeploy in Vercel so the environment variables take effect.
1. Copy your production URL from Vercel or connect a custom domain.
1. Go back to your GitHub App settings and add a callback URL for your domain:

```text
https://your-domain.com/api/keystatic/github/oauth/callback
```

1. Update your environment variables with the site URL:

```env
NEXT_PUBLIC_NCP_APP_URL=https://your-domain.com
NEXT_PUBLIC_NCP_STORAGE_KIND=github
NEXT_PUBLIC_NCP_GITHUB_USERNAME=your-github-username-or-org
NEXT_PUBLIC_NCP_REPO_NAME=your-repo-name
KEYSTATIC_GITHUB_CLIENT_ID=from-github-app
KEYSTATIC_GITHUB_CLIENT_SECRET=from-github-app
KEYSTATIC_SECRET=from-github-app
NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=from-github-app
```

1. Open your website and visit /keystatic to update your content.

## Engineering

See ENGINEERING_README.md for local development and customization.
