import { App } from 'octokit';

const app = new App({
  appId: process.env.GITHUB_APP_ID,
  privateKey: process.env.GITHUB_APP_PK_PEM.replace(/\\n/g, '\n'),
});

export async function getInstallation() {
  const installations = await app.octokit.request('GET /app/installations');
  const installation = Array.from(installations.data).find(
    (installation) => installation.account.login === 'adrianmurage'
  );
  return installation;
}

async function createAuthenticatedOctokitInstance(installationId) {
  const octokit = await app.getInstallationOctokit(installationId);

  return octokit;
}

export async function createGitHubRequest(path) {
  const installation = await getInstallation();
  const octokit = await createAuthenticatedOctokitInstance(installation.id);

  const issues = await octokit.request(path);

  return issues;
}

export async function fetchGhIssues() {
  const issues = await createGitHubRequest(
    'GET /repos/adrianmurage/ISR-Next-13/issues'
  );
  return issues;
}
