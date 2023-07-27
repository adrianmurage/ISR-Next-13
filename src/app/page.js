import ExplanationBlock from '../components/ExplanationBlock';
import InlineCodeBlock from '../components/InlineCodeBlock';
import IssuesList from '../components/IssuesList';
import NavBar from '../components/NavBar';
import { fetchIssues } from '../lib/githubFetch';
import { fetchGhIssues } from '../lib/octokit';

export const revalidate = 90;

export default async function Home() {
  const issuesWithFetch = await fetchIssues();
  const issuesWithOctokit = await fetchGhIssues();
  return (
    <>
      <main className="p-6 pt-10 space-y-8 max-w-5xl mx-auto">
        <NavBar />
        <section>
          <ExplanationBlock />
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
