import ExplanationBlock from '../components/ExplanationBlock';
import InlineCodeBlock from '../components/InlineCodeBlock';
import IssuesList from '../components/IssuesList';
import NavBar from '../components/NavBar';
import { fetchIssues } from '../lib/fetchBgRevalidation';
import { fetchGhIssues } from '../lib/octokitBgRevalidation';

export const revalidate = 10;

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
        <NavBar />
        <section>
          <ExplanationBlock>
            <h1 className="font-medium mb-4 text-lg">
              Background revalidation with{' '}
              <InlineCodeBlock>fetch( )</InlineCodeBlock> and a third party
              library ( <InlineCodeBlock>Octokit.js</InlineCodeBlock> )
            </h1>
            <div>This app demonstrates how ISR works in Next.js 13.4.8</div>
          </ExplanationBlock>
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
