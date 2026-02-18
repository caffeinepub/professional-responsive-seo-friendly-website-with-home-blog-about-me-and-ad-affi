import { useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      // Lock body scroll when menu is open
      document.body.style.overflow = 'hidden';
      
      // Handle escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Menu Panel */}
      <div
        className="fixed right-0 top-0 z-[101] h-full w-[85vw] max-w-sm overflow-y-auto bg-background/95 backdrop-blur-md shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="mobile-menu-content flex min-h-full flex-col p-6">
          {/* Close button */}
          <div className="mb-8 flex items-center justify-between">
            <span className="text-lg font-bold neon-text">Menu</span>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 space-y-2">
            {/* Get Started Button */}
            <Button
              asChild
              className="mb-4 w-full bg-gradient-to-r from-yellow-500 to-yellow-600 font-semibold text-black hover:from-yellow-400 hover:to-yellow-500"
              onClick={onClose}
            >
              <Link to="/registration">
                Get Started
              </Link>
            </Button>

            {/* Home Link */}
            <Link
              to="/"
              onClick={onClose}
              className="neon-menu-item block rounded-lg px-4 py-3 text-lg font-semibold transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Home
            </Link>

            {/* Work Tasks Section */}
            <div className="mb-4">
              <div className="neon-menu-item mb-2 px-4 py-3 text-lg font-semibold">
                Work Tasks
              </div>
              <div className="ml-4 space-y-2">
                <Link
                  to="/tasks/task-1"
                  onClick={onClose}
                  className="block rounded-lg px-4 py-2 text-base font-medium text-white/90 transition-colors hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Task 1
                </Link>
                <Link
                  to="/tasks/task-2"
                  onClick={onClose}
                  className="block rounded-lg px-4 py-2 text-base font-medium text-white/90 transition-colors hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Task 2
                </Link>
                <Link
                  to="/tasks/task-3"
                  onClick={onClose}
                  className="block rounded-lg px-4 py-2 text-base font-medium text-white/90 transition-colors hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Task 3
                </Link>
              </div>
            </div>

            {/* Payment Proof Link */}
            <Link
              to="/payment-proof"
              onClick={onClose}
              className="neon-menu-item block rounded-lg px-4 py-3 text-lg font-semibold transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Payment Proof
            </Link>

            {/* Support Link */}
            <Link
              to="/support"
              onClick={onClose}
              className="neon-menu-item block rounded-lg px-4 py-3 text-lg font-semibold transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Support
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
