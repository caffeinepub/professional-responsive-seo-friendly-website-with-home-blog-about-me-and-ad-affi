import React, { useState, useEffect } from 'react';
import { useGetAllUsers, useApproveUser } from '../hooks/useQueries';
import { Seo } from '../components/seo/Seo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ShieldAlert, Lock, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Principal } from '@dfinity/principal';
import { ApprovalStatus, UserStatus } from '../backend';
import type { UserApprovalInfo } from '../backend';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'habibur123';

export default function AdminPanelPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Check sessionStorage on mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem('adminAuthenticated');
    if (authStatus === 'true') {
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
        setLoginError('');
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
    setLoginError('');
  };

  // Show login form if not authenticated
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
                  Please log in with your admin credentials to access the admin panel
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  {loginError && (
                    <Alert variant="destructive">
                      <ShieldAlert className="h-4 w-4" />
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
                      className="bg-black/40 border-neon-cyan/30 text-white placeholder:text-gray-500"
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
                      className="bg-black/40 border-neon-cyan/30 text-white placeholder:text-gray-500"
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
            <p className="text-red-400 text-lg font-semibold">Failed to load users</p>
            <p className="text-gray-400 text-sm max-w-md text-center">
              {error instanceof Error ? error.message : 'An unknown error occurred'}
            </p>
            <div className="text-xs text-gray-500 max-w-lg text-center mt-2 bg-black/40 p-4 rounded-lg">
              <p className="font-semibold mb-2">Error Details:</p>
              <pre className="text-left overflow-auto">
                {JSON.stringify(error, null, 2)}
              </pre>
            </div>
            <div className="text-xs text-gray-500 max-w-lg text-center mt-2">
              <p>Troubleshooting tips:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Check that the backend canister is deployed and running</li>
                <li>Verify your network connection</li>
                <li>Ensure getAllUsers is a public query function</li>
              </ul>
            </div>
            <Button
              onClick={() => refetch()}
              variant="outline"
              className="border-red-500/50 text-red-400 hover:bg-red-500/20 mt-4"
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

  // Display user list in a simple table format
  return (
    <Card className="glass-background border-neon-cyan/30">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">
          Registered Users ({users.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
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
                  <td className="py-4 px-4 text-white">{user.username}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === UserStatus.Approved
                          ? 'bg-green-500/20 text-green-400'
                          : user.status === UserStatus.Pending
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
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
      </CardContent>
    </Card>
  );
}
