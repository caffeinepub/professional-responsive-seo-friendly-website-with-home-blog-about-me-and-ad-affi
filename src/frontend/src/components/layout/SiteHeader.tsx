import { Link, useRouterState } from '@tanstack/react-router';

export function SiteHeader() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/assets/generated/site-logo.dim_512x512.png"
            alt="Site Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-xl font-bold tracking-tight">MHS Habibur Blog</span>
        </Link>
        <nav className="flex items-center space-x-1 sm:space-x-2">
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
      </div>
    </header>
  );
}
