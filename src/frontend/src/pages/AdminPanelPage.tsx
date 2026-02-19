import React, { useState, useEffect } from 'react';
import { useGetAllUsers, useApproveUser } from '../hooks/useQueries';
import { Seo } from '../components/seo/Seo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserListTable } from '../components/admin/UserListTable';
import { Loader2, ShieldAlert, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ADMIN_SESSION_KEY = 'hs_admin_authenticated';
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'habibur123';

export default function AdminPanelPage() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Check for existing admin session on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (stored === 'true') {
      setIsAdminAuthenticated(true);
    }
    setIsCheckingAuth(false);
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    // Basic client-side validation
    if (!username.trim() || !password.trim()) {
      setLoginError('Please enter both username and password.');
      return;
    }

    setIsLoggingIn(true);

    // Simulate async login
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
        setIsAdminAuthenticated(true);
        setLoginError('');
      } else {
        setLoginError('Invalid admin credentials. Please try again.');
      }
      setIsLoggingIn(false);
    }, 500);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAdminAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  // Show loading while checking auth
  if (isCheckingAuth) {
    return (
      <>
        <Seo title="Admin Panel - Loading" />
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-neon-cyan" />
          </div>
        </div>
      </>
    );
  }

  // Show login form if not authenticated
  if (!isAdminAuthenticated) {
    return (
      <>
        <Seo title="Admin Panel - Login" />
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
                  Admin Login
                </CardTitle>
                <p className="text-center text-gray-300 mt-2">
                  Enter admin credentials to access the panel
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAdminLogin} className="space-y-6">
                  {loginError && (
                    <Alert variant="destructive">
                      <ShieldAlert className="h-4 w-4" />
                      <AlertDescription>{loginError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="admin-username" className="text-white">
                      Username
                    </Label>
                    <Input
                      id="admin-username"
                      type="text"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        if (loginError) setLoginError('');
                      }}
                      className="bg-black/40 text-white border-neon-cyan/30 focus:border-neon-cyan"
                      placeholder="Enter admin username"
                      required
                      disabled={isLoggingIn}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-password" className="text-white">
                      Password
                    </Label>
                    <Input
                      id="admin-password"
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (loginError) setLoginError('');
                      }}
                      className="bg-black/40 text-white border-neon-cyan/30 focus:border-neon-cyan"
                      placeholder="Enter admin password"
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
              Logout
            </Button>
          </div>

          {/* User List Table */}
          <AdminUserList />
        </div>
      </div>
    </>
  );
}

function AdminUserList() {
  const { data: users, isLoading, error, refetch } = useGetAllUsers();

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
            <p className="text-red-400 text-lg">Failed to load users</p>
            <p className="text-gray-400 text-sm">{error.message}</p>
            <Button
              onClick={() => refetch()}
              variant="outline"
              className="border-red-500/50 text-red-400 hover:bg-red-500/20"
            >
              Try Again
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

  return <UserListTable users={users} />;
}
