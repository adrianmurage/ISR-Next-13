import ExplanationBlock from '../../components/ExplanationBlock';
import InlineCodeBlock from '../../components/InlineCodeBlock';
import NavBar from '../../components/NavBar';

export default function OnDemand() {
  return (
    <>
      <main className="p-6 pt-10 space-y-8 max-w-5xl mx-auto">
        <NavBar />
        <section>
          <ExplanationBlock>
            <h1 className="font-medium mb-4 text-lg">
              Background revalidation with{' '}
              <InlineCodeBlock>fetch( )</InlineCodeBlock>
              and a third party library ({' '}
              <InlineCodeBlock>Octokit.js</InlineCodeBlock> )
            </h1>
            <div>This app demonstrates how ISR works in Next.js 13.4.8</div>
          </ExplanationBlock>
        </section>
      </main>
    </>
  );
}
