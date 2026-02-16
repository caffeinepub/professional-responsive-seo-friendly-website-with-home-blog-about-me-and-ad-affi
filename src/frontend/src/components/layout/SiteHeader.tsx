import { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Menu } from 'lucide-react';
import { MobileMenu } from './MobileMenu';

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/assets/generated/site-logo.dim_512x512.png"
              alt="Site Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="text-xl font-bold tracking-tight">MHS Habibur Blog</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-1 sm:flex sm:space-x-2">
            <Link
              to="/"
              className={`px-3 py-2 text-sm font-medium transition-colors hover:text-foreground/80 ${
                isActive('/') && currentPath === '/' ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              Home
            </Link>
            <Link
              to="/blog"
              className={`px-3 py-2 text-sm font-medium transition-colors hover:text-foreground/80 ${
                isActive('/blog') ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              Blog
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 text-sm font-medium transition-colors hover:text-foreground/80 ${
                isActive('/about') ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              About Me
            </Link>
          </nav>

          {/* Mobile Hamburger Button - Always visible on mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background/80 backdrop-blur-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:hidden"
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
