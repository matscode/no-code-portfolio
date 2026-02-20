## Engineering README

This guide helps developers run the project locally and contribute changes to the repo.

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

## Project Structure

- src/app: App Router routes, metadata, and route handlers
- src/components: UI building blocks
- src/helpers: content helpers and data formatting
- src/lib: shared utilities and Keystatic reader
- ncp: Keystatic content source (local)
- public/ncp: public assets used by content

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

## Contributing

1. Fork the repo and create a new branch from main.
2. Make your changes locally.
3. Ensure the site runs locally with yarn dev.
4. Open a PR with a clear summary and screenshots if UI changed.
