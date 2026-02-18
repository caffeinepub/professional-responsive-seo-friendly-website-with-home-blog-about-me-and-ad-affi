import { Link } from '@tanstack/react-router';
import { SiWhatsapp } from 'react-icons/si';
import { Heart } from 'lucide-react';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'unknown-app';

  return (
    <footer className="border-t border-border/40 bg-gradient-to-b from-slate-900 to-black">
      <div className="container py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Copyright & Owner Info */}
          <div className="md:col-span-2">
            <p className="mb-2 text-base font-semibold text-white md:text-lg">
              © {currentYear} H★S Online Earn Platform. All Rights Reserved.
            </p>
            <p className="text-sm text-yellow-400/90 md:text-base">
              Designed & Managed by Md. Habibur Rahman.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 md:justify-end">
            <a
              href="https://wa.me/8801704186771"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white transition-all hover:bg-green-700 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="WhatsApp"
            >
              <SiWhatsapp className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-6 border-t border-white/10 pt-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/70 md:gap-6">
            <Link
              to="/"
              className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Home
            </Link>
            <span className="text-white/30">•</span>
            <Link
              to="/payment-proof"
              className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Payment Proof
            </Link>
            <span className="text-white/30">•</span>
            <Link
              to="/support"
              className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Contact Support
            </Link>
          </div>
        </div>

        {/* Caffeine Attribution */}
        <div className="mt-6 border-t border-white/10 pt-6 text-center text-sm text-white/60">
          <p className="flex items-center justify-center gap-1">
            Built with <Heart className="h-4 w-4 fill-red-500 text-red-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white/80 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
