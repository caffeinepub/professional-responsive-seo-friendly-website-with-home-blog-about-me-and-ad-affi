import React from 'react';
import { useGetAllUsers, useIsCallerAdmin } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useActor } from '../hooks/useActor';
import { Seo } from '../components/seo/Seo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ShieldAlert, Lock, LogOut, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UserStatus } from '../backend';

export default function AdminPanelPage() {
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const { data: isAdmin, isLoading: isCheckingAdmin } = useIsCallerAdmin();
  
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    await clear();
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <Seo title="Admin Panel - Login Required" />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <Card className="glass-background border-neon-cyan/30">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-neon-cyan/20 p-4">
                    <Lock className="h-12 w-12 text-neon-cyan" />
                  </div>
                </div>
                <CardTitle className="text-center text-3xl font-bold text-white">
                  Admin Panel Access
                </CardTitle>
                <p className="text-center text-gray-300 mt-2">
                  Please authenticate with Internet Identity to access the admin panel
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert className="bg-blue-500/10 border-blue-500/30">
                    <AlertCircle className="h-4 w-4 text-blue-400" />
                    <AlertDescription className="text-blue-300">
                      Admin access requires Internet Identity authentication. Only authorized admins can view and manage users.
                    </AlertDescription>
                  </Alert>

                  <Button
                    onClick={handleLogin}
                    disabled={isLoggingIn}
                    className="w-full neon-button-primary min-h-12 text-lg"
                  >
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Authenticating...
                      </>
                    ) : (
                      'Login with Internet Identity'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  // Check if user is admin
  if (isCheckingAdmin || actorFetching) {
    return (
      <>
        <Seo title="Admin Panel - Verifying Access" />
        <div className="container mx-auto px-4 py-12">
          <Card className="glass-background border-neon-cyan/30 max-w-md mx-auto">
            <CardContent className="py-12">
              <div className="flex flex-col items-center justify-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-neon-cyan" />
                <p className="text-gray-300 text-lg">Verifying admin access...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  // Show access denied if not admin
  if (!isAdmin) {
    return (
      <>
        <Seo title="Admin Panel - Access Denied" />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <Card className="glass-background border-red-500/30">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-red-500/20 p-4">
                    <ShieldAlert className="h-12 w-12 text-red-400" />
                  </div>
                </div>
                <CardTitle className="text-center text-3xl font-bold text-white">
                  Access Denied
                </CardTitle>
                <p className="text-center text-gray-300 mt-2">
                  You do not have admin privileges to access this panel
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert variant="destructive">
                    <ShieldAlert className="h-4 w-4" />
                    <AlertDescription>
                      Only authorized administrators can access the admin panel. Your principal ID: {identity?.getPrincipal().toString()}
                    </AlertDescription>
                  </Alert>

                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full border-red-500/50 text-red-400 hover:bg-red-500/20"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  // Show admin panel content when authenticated and authorized
  return (
    <>
      <Seo title="Admin Panel - User Management" />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold neon-heading mb-2">
                Admin Panel - User Management
              </h1>
              <p className="text-gray-300 text-lg">
                Review and approve new user registrations. Only approved users can access work tasks.
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-500/50 text-red-400 hover:bg-red-500/20 hover:text-red-300"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* Connection Status */}
          {!actor && !actorFetching && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Backend connection unavailable. Please refresh the page or check your network connection.
              </AlertDescription>
            </Alert>
          )}

          {/* User List */}
          <AdminUserList />
        </div>
      </div>
    </>
  );
}

function AdminUserList() {
  const { data: users, isLoading, error, refetch, isFetching } = useGetAllUsers();
  const { actor } = useActor();

  if (isLoading) {
    return (
      <Card className="glass-background border-neon-cyan/30">
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-neon-cyan" />
            <p className="text-gray-300 text-lg">Loading users...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="glass-background border-red-500/30">
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center gap-4">
            <ShieldAlert className="h-12 w-12 text-red-400" />
            <p className="text-red-400 text-lg font-semibold">Failed to load users</p>
            <p className="text-gray-400 text-sm max-w-md text-center">
              {error instanceof Error ? error.message : 'An unknown error occurred'}
            </p>
            <div className="text-xs text-gray-500 max-w-lg text-center mt-2 bg-black/40 p-4 rounded-lg">
              <p className="font-semibold mb-2">Debug Information:</p>
              <div className="text-left space-y-2">
                <p>Actor available: {actor ? 'Yes' : 'No'}</p>
                <p>Error type: {error?.constructor?.name || 'Unknown'}</p>
                {error instanceof Error && (
                  <>
                    <p>Message: {error.message}</p>
                    {error.stack && (
                      <pre className="text-xs overflow-auto max-h-32 mt-2">
                        {error.stack}
                      </pre>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="text-xs text-gray-500 max-w-lg text-center mt-2">
              <p className="font-semibold mb-1">Troubleshooting tips:</p>
              <ul className="list-disc list-inside mt-1 space-y-1 text-left">
                <li>Verify the backend canister is deployed and running</li>
                <li>Check your network connection</li>
                <li>Ensure you're authenticated as an admin</li>
                <li>Try logging out and logging back in</li>
              </ul>
            </div>
            <Button
              onClick={() => refetch()}
              disabled={isFetching}
              variant="outline"
              className="border-red-500/50 text-red-400 hover:bg-red-500/20 mt-4"
            >
              {isFetching ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Retrying...
                </>
              ) : (
                'Try Again'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!users || users.length === 0) {
    return (
      <Card className="glass-background border-neon-cyan/30">
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center gap-4">
            <ShieldAlert className="h-12 w-12 text-gray-400" />
            <p className="text-gray-300 text-lg">No users registered yet</p>
            <p className="text-gray-400 text-sm">
              Users will appear here once they register
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Display user list with mobile-optimized layout
  return (
    <Card className="glass-background border-neon-cyan/30">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">
          Registered Users ({users.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neon-cyan/30">
                <th className="text-left py-4 px-4 text-neon-cyan font-semibold">
                  Username
                </th>
                <th className="text-left py-4 px-4 text-neon-cyan font-semibold">
                  Status
                </th>
                <th className="text-left py-4 px-4 text-neon-cyan font-semibold">
                  Registered At
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={`${user.username}-${index}`}
                  className="border-b border-white/10 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-4 text-white font-medium">{user.username}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === UserStatus.Approved
                          ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                          : user.status === UserStatus.Pending
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                          : 'bg-red-500/20 text-red-400 border border-red-500/50'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-300">
                    {new Date(Number(user.registeredAt) / 1000000).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {users.map((user, index) => (
            <Card
              key={`${user.username}-${index}`}
              className="bg-gray-900/60 border-white/20 rounded-xl"
            >
              <CardContent className="p-6 space-y-4">
                <div>
                  <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">
                    Username
                  </p>
                  <p className="text-white font-semibold text-lg">{user.username}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">
                    Status
                  </p>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === UserStatus.Approved
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                        : user.status === UserStatus.Pending
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                        : 'bg-red-500/20 text-red-400 border border-red-500/50'
                    }`}
                  >
                    {user.status}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">
                    Registered At
                  </p>
                  <p className="text-gray-300 text-sm">
                    {new Date(Number(user.registeredAt) / 1000000).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
