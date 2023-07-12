export default function ExplanationBlock({ children }) {
  return (
    <>
      <div className="border border-dashed p-4 border-orange-400 bg-white">
        {children}
      </div>
    </>
  );
}
