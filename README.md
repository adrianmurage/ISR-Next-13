# Incremental Static Regeneration in Next.js 13.4.9

Demo of on-demand and background ISR in Next.js 13.4.9 using GitHub Issues. The app demonstrates how to use both the [`fetch()`](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching) method and the third party SDK [`Octokit.js`](https://github.com/octokit/octokit.js) to fetch GitHub issues and revalidate them at runtime. 

## On-Demand ISR

When a new issues is created, a webhook from a GitHub App pushes new changes to the deployed application to regenerate the static page.

## Background ISR

Every 90 seconds the Next.js cache is invalidated and on the next visit after invalidation of the cache, Next.js regenerates the static page.

## Setup

1. Create a new [GitHub App](https://github.com/settings/apps/new).
   1. Provide the URL of your deployed application for Homepage URL.
   2. Ensure Webhook "Active" is checked.
   3. Add `<your-site>/api/webhook` as the Webhook URL if you would like to use the `Pages` Router API routes or `<your-site>/api/revalidate` as the Webhook URL if you would like to use the `App` Router route handlers.
   4. Create a Webhook secret and add it to .env.local as `GITHUB_WEBHOOK_SECRET`.
   5. Give "Read Only" access to Issues.
   6. Subscribe to "Issues" events.
2. Add the App ID to `.env.local` as `GITHUB_APP_ID`.
3. Generate a private key and add it to `.env.local` as `GITHUB_APP_PK_PEM`.
4. Install the newly created GitHub App for your repo.
5. To confirm that the GitHub App was installed successfully, check you list of app installations: `https://github.com/settings/apps/<your-app-name>/installations`


## Running Locally
```bash
npm run dev
```

## Setting up Octokit

You should follow the guide on [using the octokit.js sdk to authenticate as an app installation](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation#using-the-octokitjs-sdk-to-authenticate-as-an-app-installation)
