import Link from 'next/link';

export default function NavButton({ children, href, isActive }) {
  return (
    <>
      <Link
        href={href}
        className={`rounded-md  p-3  hover:ring-2 hover:ring-offset-2 cursor-pointer hover:ring-orange-600 ${
          isActive
            ? 'bg-orange-500 hover:bg-orange-600 text-white'
            : 'bg-slate-700   hover:bg-slate-800 text-slate-50'
        }`}
      >
        {children}
      </Link>
    </>
  );
}
