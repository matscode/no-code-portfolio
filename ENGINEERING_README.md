## Engineering README

This guide covers local development and customization for the no-code-portfolio project.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Keystatic CMS

## Local Development

1. Install dependencies:

```bash
yarn install
```

2. Run the dev server:

```bash
yarn dev
```

3. Open http://localhost:3000

## Content Editing (Keystatic)

- Admin UI: /keystatic
- Content root: ncp/
- Public assets: public/ncp/

### Storage Modes

- Local mode: set NEXT_PUBLIC_NCP_STORAGE_KIND=local (best for local-only edits)
- GitHub mode: set NEXT_PUBLIC_NCP_STORAGE_KIND=github (best for live edits on hosted environments)

## Environment Variables

Copy .env.example to .env.local and fill in values as needed:

- NEXT_PUBLIC_NCP_APP_URL
- NEXT_PUBLIC_NCP_STORAGE_KIND
- NEXT_PUBLIC_NCP_GITHUB_USERNAME
- NEXT_PUBLIC_NCP_REPO_NAME
- NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
- KEYSTATIC_GITHUB_CLIENT_ID
- KEYSTATIC_GITHUB_CLIENT_SECRET
- KEYSTATIC_SECRET
- NCP_GITHUB_TOKEN

## Scripts

- yarn dev
- yarn lint
- yarn test
- yarn build
