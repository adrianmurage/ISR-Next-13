'use client';

import { usePathname } from 'next/navigation';
import NavButton from './NavButton';

export default function NavBar() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <>
      <nav className="flex space-x-10">
        <NavButton isActive={pathname === '/' ? true : false} href="/">
          Background
        </NavButton>
        <NavButton
          isActive={pathname === '/onDemand' ? true : false}
          href="/onDemand"
        >
          On Demand
        </NavButton>
      </nav>
    </>
  );
}
