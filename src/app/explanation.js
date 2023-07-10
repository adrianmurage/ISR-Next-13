export default function Explanation() {
  return (
    <>
      <div className="border border-dashed p-4 border-orange-400 bg-white">
        <h1 className="font-medium mb-4 text-lg">
          Background revalidation with{' '}
          <span className="bg-slate-800 text-slate-50 px-2 py-1 rounded text-sm">
            fetch( )
          </span>{' '}
          and a third party library ({' '}
          <span className="bg-slate-800 text-slate-50 px-2 py-1 rounded text-sm">
            Octokit.js
          </span>
          {' '})
        </h1>
        <div>This app demonstrates how ISR works in Next.js 13.4.8</div>
      </div>
    </>
  );
}
