import React, { useState, useEffect } from 'react';
import { useGetAllUsers, useApproveUser } from '../hooks/useQueries';
import { useActor } from '../hooks/useActor';
import { Seo } from '../components/seo/Seo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ShieldAlert, Lock, LogOut, AlertCircle, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UserStatus } from '../backend';
import { toast } from 'sonner';
import { Principal } from '@dfinity/principal';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'habibur123';

export default function AdminPanelPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Check session storage on mount
  useEffect(() => {
    const adminAuth = sessionStorage.getItem('adminAuthenticated');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    // Simulate a brief loading state for better UX
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        sessionStorage.setItem('adminAuthenticated', 'true');
        setIsAuthenticated(true);
        toast.success('Login successful!');
      } else {
        setLoginError('Invalid username or password');
      }
      setIsLoggingIn(false);
    }, 500);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    toast.success('Logged out successfully');
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
                  Please login to access the admin panel
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  {loginError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{loginError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-white">
                      Username
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                      className="bg-gray-900/60 border-neon-cyan/30 text-white placeholder:text-gray-500"
                      required
                      disabled={isLoggingIn}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="bg-gray-900/60 border-neon-cyan/30 text-white placeholder:text-gray-500"
                      required
                      disabled={isLoggingIn}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full neon-button-primary min-h-12 text-lg"
                  >
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  // Show admin panel content when authenticated
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
  const approveMutation = useApproveUser();

  const handleApprove = async (userPrincipal: Principal, username: string) => {
    try {
      await approveMutation.mutateAsync(userPrincipal);
      toast.success(`User "${username}" has been approved successfully!`, {
        duration: 4000,
      });
    } catch (error: any) {
      console.error('Approval error:', error);
      toast.error(`Failed to approve user: ${error.message}`, {
        duration: 5000,
      });
    }
  };

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

  // Sort users: Pending first, then Approved, then Rejected
  const sortedUsers = [...users].sort((a, b) => {
    const statusOrder = { Pending: 0, Approved: 1, Rejected: 2 };
    const aOrder = statusOrder[a.status] ?? 3;
    const bOrder = statusOrder[b.status] ?? 3;
    return aOrder - bOrder;
  });

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
                <th className="text-right py-4 px-4 text-neon-cyan font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user, index) => (
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
                      {user.status === UserStatus.Approved && <CheckCircle2 className="mr-1 h-3 w-3" />}
                      {user.status === UserStatus.Pending && <Clock className="mr-1 h-3 w-3" />}
                      {user.status === UserStatus.Rejected && <XCircle className="mr-1 h-3 w-3" />}
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-300">
                    {new Date(Number(user.registeredAt) / 1000000).toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right">
                    {user.status === UserStatus.Pending ? (
                      <Button
                        onClick={() => {
                          // We need to get the principal from somewhere
                          // Since the backend getAllUsers doesn't return principals,
                          // we'll need to work with what we have
                          toast.error('Cannot approve: Principal ID not available in user data');
                        }}
                        disabled={approveMutation.isPending}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        {approveMutation.isPending ? (
                          <>
                            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                            Approving...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Approve
                          </>
                        )}
                      </Button>
                    ) : (
                      <span className="text-gray-500 text-sm">No action needed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {sortedUsers.map((user, index) => (
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
                    {user.status === UserStatus.Approved && <CheckCircle2 className="mr-1 h-3 w-3" />}
                    {user.status === UserStatus.Pending && <Clock className="mr-1 h-3 w-3" />}
                    {user.status === UserStatus.Rejected && <XCircle className="mr-1 h-3 w-3" />}
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

                {user.status === UserStatus.Pending && (
                  <Button
                    onClick={() => {
                      toast.error('Cannot approve: Principal ID not available in user data');
                    }}
                    disabled={approveMutation.isPending}
                    className="w-full min-h-[44px] bg-green-600 hover:bg-green-700 text-white font-semibold text-base py-3 rounded-lg shadow-lg"
                  >
                    {approveMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Approving...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="mr-2 h-5 w-5" />
                        Approve
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
