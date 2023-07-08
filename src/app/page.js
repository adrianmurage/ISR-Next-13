import jwt from 'jsonwebtoken';
import getFormattedTime from './time-ago';
import { GoIssueOpened } from 'react-icons/go';

export default async function Home() {
  let accessToken;
  function getGitHubJWT() {
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

  function createGitHubRequest(path, token, opts) {
    return fetch(`https://api.github.com${path}`, {
      ...opts,
      headers: {
        // ...opts.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json/github.v3.json',
      },
      next: { revalidate: 10 },
    });
  }

  async function fetchGitHub(path, token, opts) {
    let req = await createGitHubRequest(path, token, opts);

    if (req.status === 401) {
      // JWT has expired, cache a new token
      accessToken = await setAccessToken();
      // Retry request with new cached access token
      req = await createGitHubRequest(path, accessToken, opts);
    }

    return req.json();
  }

  async function getInstallation(token) {
    const installations = await fetchGitHub('/app/installations', token);
    const installation = Array.from(installations).find(
      (installation) => installation.account.login === 'adrianmurage'
    );

    return installation;
  }

  async function getAccessToken(installationId, token) {
    const data = await fetchGitHub(
      `/app/installations/${installationId}/access_tokens`,
      token,
      { method: 'POST' }
    );
    return data.token;
  }

  async function setAccessToken() {
    const jwt = getGitHubJWT();
    const installation = await getInstallation(jwt);
    accessToken = await getAccessToken(installation.id, jwt);

    return accessToken;
  }

  async function fetchIssues() {
    const issues = await fetchGitHub(
      '/repos/adrianmurage/ISR-Next-13/issues',
      accessToken
    );
    return issues;
  }

  const issuesAndPrs = await fetchIssues();

  // filter out Pull Requests from the results
  //reason can be found here: https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#list-repository-issues
  const issues = issuesAndPrs.filter(
    (issue) => issue.node_id.charAt(0) === 'I'
  );

  return (
    <>
      <main className="p-6 pt-10 space-y-8 max-w-5xl mx-auto">
        <section>
          <div className="border border-dashed p-4 border-orange-400 bg-white">
            <div>This app demonstrates how ISR works in Next.js 13.4.8</div>
            <p>There are {issues.length} issues</p>
          </div>
        </section>
        <section>
          <div className="border rounded-md bg-white">
            {issues.map((issue) => (
              <>
                <div className="px-3 py-4 border-b last:border-b-0 flex items-start gap-2 hover:cursor-pointer hover:bg-slate-100">
                  <GoIssueOpened className="mx-2 mt-1 text-green-600 stroke-2" />
                  <div className="space-y-2">
                    <div className="font-bold">{issue.title}</div>
                    <div className="text-sm text-gray-500">
                      #{issue.number} opened{' '}
                      {getFormattedTime(issue.created_at)} by {issue.user.login}
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
