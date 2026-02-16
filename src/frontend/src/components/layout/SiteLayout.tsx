import { Outlet } from '@tanstack/react-router';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

export function SiteLayout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Fixed background image with parallax effect */}
      <div className="site-background" />
      
      {/* Dark overlay for text readability */}
      <div className="site-overlay" />
      
      {/* Content wrapper with relative positioning */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
