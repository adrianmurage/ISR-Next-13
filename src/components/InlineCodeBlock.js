export default function InlineCodeBlock({ children }) {
  return (
    <>
      <span className="bg-blue-900 text-slate-50 px-2 py-1 rounded text-sm">
        {children}
      </span>
    </>
  );
}
