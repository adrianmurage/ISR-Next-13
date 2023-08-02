export default function ExplanationBlock({ children }) {
  return (
    <>
      <div className="border border-dashed p-4 border-orange-400 bg-white">
      <h1 className="font-medium mb-4 text-lg">
              This App Demonstrates Incremental Static Regeneration in Next.js
              13.4.9.
            </h1>
            <details>
              <summary>
                <span>Background Revalidation</span>
              </summary>
              <p>longer version</p>
            </details>
            <details>
              <summary>
                <span>On-Demand Revalidation</span>
              </summary>
              <p>longer version</p>
            </details>
      </div>
    </>
  );
}
