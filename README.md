# No Code Portfolio

Next.js + Keystatic-powered portfolio template.

## Deploy to Vercel

1. Push your repo to GitHub.
2. In Vercel, create a new project and import the repo.
3. Add these environment variables:
   - NEXT_PUBLIC_NCP_APP_URL = your production URL (e.g., https://your-domain.com)
   - NEXT_PUBLIC_NCP_STORAGE_KIND = github
   - NEXT_PUBLIC_NCP_GITHUB_USERNAME
   - NEXT_PUBLIC_NCP_REPO_NAME (optional, defaults to no-code-portfolio)
   - KEYSTATIC_GITHUB_CLIENT_ID
   - KEYSTATIC_GITHUB_CLIENT_SECRET
   - KEYSTATIC_SECRET
   - NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG (optional)
   - NCP_GITHUB_TOKEN (optional)
4. Deploy.
5. Open https://your-domain.com/keystatic to edit content.

## Engineering

See ENGINEERING_README.md for local development and customization.
