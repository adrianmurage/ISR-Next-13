import ExplanationBlock from '../../components/ExplanationBlock';
import InlineCodeBlock from '../../components/InlineCodeBlock';
import IssuesList from '../../components/IssuesList';
import NavBar from '../../components/NavBar';
import { fetchIssues } from '../../lib/githubFetch';
import { fetchGhIssues } from '../../lib/octokit';

export default async function OnDemand() {
  const issuesWithFetch = await fetchIssues();
  const issuesWithOctokit = await fetchGhIssues();
  return (
    <>
      <main className="p-6 pt-10 space-y-8 max-w-5xl mx-auto">
        <NavBar />
        <section>
          <ExplanationBlock />
        </section>
        <div className="grid grid-cols-2 gap-x-2 md:gap-x-5">
          <section>
            <h1 className="font-medium mb-4">
              On Demand Revalidation with fetch
            </h1>
            <IssuesList issues={issuesWithFetch} />
          </section>
          <section>
            <h1 className="font-medium mb-4">
              On Demand Revalidation with Octokit.js
            </h1>
            <IssuesList issues={issuesWithOctokit} />
          </section>
        </div>
      </main>
    </>
  );
}
