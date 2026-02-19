import { useIsCallerAdmin } from '../hooks/useQueries';
import { Seo } from '../components/seo/Seo';
import { Card, CardContent } from '@/components/ui/card';
import { UserListTable } from '../components/admin/UserListTable';
import { Loader2, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';

export default function AdminPanelPage() {
  const { data: isAdmin, isLoading } = useIsCallerAdmin();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <>
        <Seo
          title="Admin Panel"
          description="Admin panel for managing users"
          path="/admin-panel"
        />
        <div className="container flex min-h-[60vh] items-center justify-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-blue-400" />
        </div>
      </>
    );
  }

  if (!isAdmin) {
    return (
      <>
        <Seo
          title="Access Denied"
          description="You do not have permission to access this page"
          path="/admin-panel"
        />
        <div className="container flex min-h-[60vh] items-center justify-center py-12">
          <Card className="glass-background border-red-500/30 max-w-md">
            <CardContent className="flex flex-col items-center p-8 text-center space-y-4">
              <div className="rounded-full bg-red-500/20 p-4">
                <ShieldAlert className="h-16 w-16 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Access Denied</h2>
              <p className="text-white/70">
                You do not have permission to access this page.
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
      </>
    );
  }

  return (
    <>
      <Seo
        title="Admin Panel"
        description="Manage registered users and approvals"
        path="/admin-panel"
      />
      <section className="container py-12">
        <div className="mb-8 text-center">
          <h1 className="neon-heading text-3xl font-bold md:text-4xl mb-2">
            Admin Panel
          </h1>
          <p className="bengali-text text-xl text-white/80">
            অ্যাডমিন প্যানেল
          </p>
        </div>

        <UserListTable />
      </section>
    </>
  );
}
