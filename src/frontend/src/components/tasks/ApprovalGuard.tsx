import { ReactNode } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../../hooks/useAuthContext';
import { useIsCallerApproved, useIsCallerAdmin } from '../../hooks/useQueries';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ApprovalGuardProps {
  children: ReactNode;
}

export function ApprovalGuard({ children }: ApprovalGuardProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { data: isApproved, isLoading: approvalLoading } = useIsCallerApproved();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();

  // Redirect to registration if not authenticated
  if (!isAuthenticated) {
    navigate({ to: '/registration' });
    return null;
  }

  // Show loading state while checking approval status
  if (approvalLoading || adminLoading) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center py-12">
        <Card className="glass-background border-white/10 max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-400 mb-4" />
            <p className="text-lg text-white">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admins can always access
  if (isAdmin) {
    return <>{children}</>;
  }

  // Show blocking message for pending users
  if (!isApproved) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center py-12">
        <Card className="glass-background border-yellow-500/30 max-w-2xl">
          <CardContent className="flex flex-col items-center p-8 text-center space-y-6">
            <div className="rounded-full bg-yellow-500/20 p-4">
              <AlertCircle className="h-16 w-16 text-yellow-400" />
            </div>
            <h2 className="bengali-text text-2xl font-bold text-white md:text-3xl">
              আপনার অ্যাকাউন্টটি বর্তমানে যাচাই করা হচ্ছে। অ্যাডমিন অ্যাপ্রুভ করার পর আপনি কাজ শুরু করতে পারবেন।
            </h2>
            <p className="text-lg text-white/80">
              Your account is currently being verified. You will be able to start working after admin approval.
            </p>
            <Button
              onClick={() => navigate({ to: '/' })}
              className="bg-blue-600 text-white hover:bg-blue-700 mt-4"
            >
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Approved users can access the content
  return <>{children}</>;
}
