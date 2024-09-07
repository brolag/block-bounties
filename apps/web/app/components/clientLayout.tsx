'use client'

import { usePathname } from 'next/navigation';
import Sidebar from "./SideBar/sideBar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  return (
    <div className="layout-container">
      {!isLandingPage && <Sidebar />}
      <main className={`main-content ${!isLandingPage ? 'with-sidebar' : ''}`}>
        {children}
      </main>
    </div>
  );
}