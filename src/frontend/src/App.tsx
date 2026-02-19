import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { RouterProvider, createRouter, createRoute, createRootRoute, useNavigate } from '@tanstack/react-router';
import { SiteLayout } from './components/layout/SiteLayout';
import HomePage from './pages/HomePage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import AboutPage from './pages/AboutPage';
import Task1Page from './pages/Task1Page';
import Task2Page from './pages/Task2Page';
import Task3Page from './pages/Task3Page';
import PaymentProofPage from './pages/PaymentProofPage';
import SupportPage from './pages/SupportPage';
import RegistrationPage from './pages/RegistrationPage';
import AdminPanelPage from './pages/AdminPanelPage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useRegisterUser, useLoginUser } from './hooks/useQueries';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { UserProfile, UserStatus } from './backend';

// ============================================================================
// AUTH CONTEXT & PROVIDER
// ============================================================================

interface User {
  username: string;
  status: UserStatus;
  registeredAt: bigint;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  logout: () => void;
  setUserSession: (profile: UserProfile) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'hs_auth_session';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      } catch (error) {
        console.error('Failed to parse stored auth session:', error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const setUserSession = (profile: UserProfile) => {
    const userData: User = {
      username: profile.username,
      status: profile.status,
      registeredAt: profile.registeredAt,
    };
    setUser(userData);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const value: AuthContextType = {
    isAuthenticated: !!user,
    user,
    isLoading,
    logout,
    setUserSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// ============================================================================
// REGISTRATION FORM COMPONENT
// ============================================================================

interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
}

interface RegistrationFormProps {
  onSwitchToLogin?: () => void;
}

export function RegistrationForm({ onSwitchToLogin }: RegistrationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const registerMutation = useRegisterUser();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setErrorMessage('');

    try {
      await registerMutation.mutateAsync({
        username: formData.username.trim(),
        password: formData.password,
      });

      setShowSuccessDialog(true);
      // Reset form
      setFormData({
        username: '',
        password: '',
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    }
  };

  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false);
    if (onSwitchToLogin) {
      onSwitchToLogin();
    }
  };

  return (
    <>
      <Card className="w-full bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-900 md:text-3xl">
            রেজিস্ট্রেশন ফর্ম
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMessage && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-900">
                Username <span className="text-red-600">*</span>
              </Label>
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={handleChange('username')}
                className="bg-white text-gray-900 border-gray-300"
                placeholder="Enter your username"
                required
              />
              {errors.username && (
                <p className="text-sm text-red-600">{errors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-900">
                Password <span className="text-red-600">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange('password')}
                  className="bg-white text-gray-900 border-gray-300 pr-10"
                  placeholder="Enter your password (min 6 characters)"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Button
                type="submit"
                disabled={registerMutation.isPending}
                className="flex-1 bg-blue-600 text-white hover:bg-blue-700 min-h-10"
              >
                {registerMutation.isPending ? 'Registering...' : 'Register'}
              </Button>
              {onSwitchToLogin && (
                <Button
                  type="button"
                  onClick={onSwitchToLogin}
                  variant="outline"
                  className="flex-1 min-h-10"
                >
                  Already have an account? Login
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={handleSuccessDialogClose}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl text-gray-900">
              রেজিস্ট্রেশন সফল!
            </DialogTitle>
            <DialogDescription className="text-center space-y-4 pt-4">
              <p className="bengali-text text-lg text-gray-700">
                আপনার নিবন্ধন সফল হয়েছে। আপনার অ্যাকাউন্টটি বর্তমানে অ্যাডমিনের অনুমোদনের জন্য অপেক্ষা করছে। অনুমোদন হলে আপনি কাজ শুরু করতে পারবেন।
              </p>
              <p className="text-base text-gray-600">
                Your registration is successful. Your account is currently awaiting admin approval. You will be able to start tasks once approved.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <Button
              onClick={handleSuccessDialogClose}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              OK, Go to Login
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ============================================================================
// LOGIN FORM COMPONENT
// ============================================================================

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const loginMutation = useLoginUser();
  const { setUserSession } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('Please enter your password');
      return;
    }

    try {
      const profile: UserProfile = await loginMutation.mutateAsync({
        password,
      });

      // Store user session
      setUserSession(profile);

      // Force page reload to update auth context
      window.location.href = '/';
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      const errorMsg = err.message || 'Login failed. Please try again.';
      
      // Check for specific error messages
      if (errorMsg.includes('pending approval') || errorMsg.includes('Pending')) {
        setError('Your account is pending approval. Please wait for admin approval before logging in.');
      } else if (errorMsg.includes('rejected') || errorMsg.includes('Rejected')) {
        setError('Your account has been rejected. Please contact admin for more information.');
      } else if (errorMsg.includes('not found')) {
        setError('User not found. Please register first.');
      } else if (errorMsg.includes('Invalid credentials')) {
        setError('Invalid password. Please try again.');
      } else {
        setError(errorMsg);
      }
    }
  };

  return (
    <Card className="w-full bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-gray-900 md:text-3xl">
          লগইন করুন
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="login-password" className="text-gray-900">
              Password <span className="text-red-600">*</span>
            </Label>
            <div className="relative">
              <Input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                className="bg-white text-gray-900 border-gray-300 pr-10"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-green-600 text-white hover:bg-green-700 min-h-10"
          >
            {loginMutation.isPending ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// ROUTER SETUP
// ============================================================================

const rootRoute = createRootRoute({
  component: SiteLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog',
  component: BlogListPage,
});

const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog/$slug',
  component: BlogPostPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const task1Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tasks/task-1',
  component: Task1Page,
});

const task2Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tasks/task-2',
  component: Task2Page,
});

const task3Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tasks/task-3',
  component: Task3Page,
});

const paymentProofRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-proof',
  component: PaymentProofPage,
});

const supportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/support',
  component: SupportPage,
});

const registrationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/registration',
  component: RegistrationPage,
});

const adminPanelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin-panel',
  component: AdminPanelPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  blogRoute,
  blogPostRoute,
  aboutRoute,
  task1Route,
  task2Route,
  task3Route,
  paymentProofRoute,
  supportRoute,
  registrationRoute,
  adminPanelRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

function App() {
  return <RouterProvider router={router} />;
}

// Export App wrapped in AuthProvider
export default function AppWithProvider() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
