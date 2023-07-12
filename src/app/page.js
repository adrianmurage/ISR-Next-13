import { fetchIssues } from './fetchBgRevalidation';

import Explanation from './explanation';
import IssuesList from './issuesList';
import { fetchGhIssues, getInstallation } from './octokitBgRevalidation';

export default async function Home() {
  const getIssuesAndPrsWithFetch = await fetchIssues();

  // filter out Pull Requests from the results
  //reason can be found here: https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#list-repository-issues
  const issuesWithFetch = getIssuesAndPrsWithFetch.filter(
    (issue) => issue.node_id.charAt(0) === 'I'
  );

  const issues = await fetchGhIssues();

  const issuesWithOctokit = issues.data.filter(
    (issue) => issue.node_id.charAt(0) === 'I'
  );
  return (
    <>
      <main className="p-6 pt-10 space-y-8 max-w-5xl mx-auto">
        <section>
          <Explanation />
        </section>
        <section>
          <h1 className="font-medium mb-4">
            Background Revalidation with fetch
          </h1>
          <IssuesList issues={issuesWithFetch} />
        </section>
        <section>
          <h1 className="font-medium mb-4">
            Background Revalidation with Octokit.js
          </h1>
          <IssuesList issues={issuesWithOctokit} />
        </section>
      </main>
    </>
  );
}
