import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useRegisterUser } from '../../hooks/useQueries';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface FormData {
  username: string;
  whatsapp: string;
  group: string;
  email: string;
  password: string;
}

interface FormErrors {
  username?: string;
  whatsapp?: string;
  group?: string;
  email?: string;
  password?: string;
}

interface RegistrationFormProps {
  onSwitchToLogin?: () => void;
}

export function RegistrationForm({ onSwitchToLogin }: RegistrationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    whatsapp: '',
    group: '',
    email: '',
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
    }

    // WhatsApp validation (11 digits starting with 01)
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp number is required';
    } else if (!/^01\d{9}$/.test(formData.whatsapp)) {
      newErrors.whatsapp = 'WhatsApp number must be 11 digits starting with 01';
    }

    // Group validation
    if (!formData.group.trim()) {
      newErrors.group = 'Group number is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
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
      const response = await registerMutation.mutateAsync({
        username: formData.username.trim(),
        whatsappNumber: formData.whatsapp.trim(),
        groupNumber: formData.group.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      if (response.__kind__ === 'success') {
        setShowSuccessDialog(true);
        // Reset form
        setFormData({
          username: '',
          whatsapp: '',
          group: '',
          email: '',
          password: '',
        });
      } else {
        setErrorMessage(response.error);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    }
  };

  const handleLoginClick = () => {
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

            {/* WhatsApp Number Field */}
            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-gray-900">
                WhatsApp Number <span className="text-red-600">*</span>
              </Label>
              <Input
                id="whatsapp"
                type="tel"
                value={formData.whatsapp}
                onChange={handleChange('whatsapp')}
                className="bg-white text-gray-900 border-gray-300"
                placeholder="01..."
                required
                maxLength={11}
              />
              {errors.whatsapp && (
                <p className="text-sm text-red-600">{errors.whatsapp}</p>
              )}
            </div>

            {/* Group Number Field */}
            <div className="space-y-2">
              <Label htmlFor="group" className="text-gray-900">
                Group Number <span className="text-red-600">*</span>
              </Label>
              <Input
                id="group"
                type="text"
                value={formData.group}
                onChange={handleChange('group')}
                className="bg-white text-gray-900 border-gray-300"
                placeholder="Enter your group number"
                required
              />
              {errors.group && (
                <p className="text-sm text-red-600">{errors.group}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-900">
                Email Address <span className="text-red-600">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                className="bg-white text-gray-900 border-gray-300"
                placeholder="your.email@example.com"
                required
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
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
                  placeholder="Enter your password"
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
              <Button
                type="button"
                onClick={handleLoginClick}
                className="flex-1 bg-green-600 text-white hover:bg-green-700 min-h-10"
              >
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
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
              onClick={() => setShowSuccessDialog(false)}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
