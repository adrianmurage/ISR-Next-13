import jwt from 'jsonwebtoken';

let accessToken;

export function getGitHubJWT() {
  if (!process.env.GITHUB_APP_ID || !process.env.GITHUB_APP_PK_PEM) {
    throw new Error(
      'GITHUB_APP_ID and GITHUB_APP_PK_PEM must be defined in .env.local'
    );
  }
  return jwt.sign(
    {
      iat: Math.floor(Date.now() / 1000) - 60,
      iss: process.env.GITHUB_APP_ID,
      exp: Math.floor(Date.now() / 1000) + 60 * 10, // 10 minutes is the max
    },
    process.env.GITHUB_APP_PK_PEM.replace(/\\n/g, '\n'),
    {
      algorithm: 'RS256',
    }
  );
}

export function createGitHubRequest(path, token, opts) {
  return fetch(`https://api.github.com${path}`, {
    ...opts,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json/github.v3.json',
    },
  });
}

export async function fetchGitHub(path, token, opts) {
  let req = await createGitHubRequest(path, token, opts);

  if (req.status === 401) {
    // JWT has expired, cache a new token
    accessToken = await setAccessToken();
    // Retry request with new cached access token
    req = await createGitHubRequest(path, accessToken, opts);
  }

  return req.json();
}

export async function getInstallation(token) {
  const installations = await fetchGitHub('/app/installations', token);
  const installation = Array.from(installations).find(
    (installation) => installation.account.login === 'adrianmurage'
  );

  return installation;
}

export async function getAccessToken(installationId, token) {
  const data = await fetchGitHub(
    `/app/installations/${installationId}/access_tokens`,
    token,
    { method: 'POST' }
  );
  return data.token;
}

export async function setAccessToken() {
  const jwt = getGitHubJWT();
  const installation = await getInstallation(jwt);
  accessToken = await getAccessToken(installation.id, jwt);

  return accessToken;
}

export async function fetchIssues() {
  const issuesAndPrs = await fetchGitHub(
    '/repos/adrianmurage/ISR-Next-13/issues',
    accessToken
  );

  // filter for only issues cause the endpoint returns both issues and PRs
  const issues = issuesAndPrs.filter(
    (issue) => issue.node_id.charAt(0) === 'I'
  );

  return issues;
}
