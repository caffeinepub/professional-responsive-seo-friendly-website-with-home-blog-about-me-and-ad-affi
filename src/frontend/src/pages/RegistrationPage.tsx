import { useState, useEffect } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Seo } from '../components/seo/Seo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Shield, Clock } from 'lucide-react';
import { RegistrationForm, LoginForm, useAuth } from '../App';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function RegistrationPage() {
  const [activeTab, setActiveTab] = useState<'register' | 'login'>('register');
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to home
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate({ to: '/' });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleLoginSuccess = () => {
    navigate({ to: '/' });
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <>
        <Seo 
          title="Registration" 
          description="Join H★S Online Earn Platform - Register now to start earning with easy typing jobs"
          path="/registration"
        />
        <div className="container flex min-h-[60vh] items-center justify-center py-12">
          <p className="text-white text-lg">Loading...</p>
        </div>
      </>
    );
  }

  // If authenticated, show success message
  if (isAuthenticated) {
    return (
      <>
        <Seo 
          title="Registration" 
          description="Join H★S Online Earn Platform - Register now to start earning with easy typing jobs"
          path="/registration"
        />
        <section className="container py-12">
          <Card className="glass-background border-green-500/30 max-w-2xl mx-auto">
            <CardContent className="p-8 text-center space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-500/20 p-4">
                  <CheckCircle2 className="h-16 w-16 text-green-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white">You are logged in!</h2>
              <p className="text-white/80">You can now access the tasks.</p>
              <Button
                asChild
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                <Link to="/tasks/task-1">Go to Tasks</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </>
    );
  }

  return (
    <>
      <Seo 
        title="Registration" 
        description="Join H★S Online Earn Platform - Register now to start earning with easy typing jobs"
        path="/registration"
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] w-full overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/generated/registration-hero-bg.dim_1600x900.png"
            alt="Registration background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex min-h-[50vh] items-center justify-center px-4 py-16">
          <div className="container max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl" style={{ color: 'gold' }}>
              H★S অনলাইন আর্নিং প্ল্যাটফর্মে আপনাকে স্বাগতম!
            </h1>
            <p className="bengali-text text-lg text-white/90 md:text-xl lg:text-2xl">
              আমাদের সাথে কাজ শুরু করতে নিচের ফর্মটি নির্ভুলভাবে পূরণ করে রেজিস্ট্রেশন সম্পন্ন করুন।
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative z-10 py-12">
        <div className="container max-w-2xl px-4">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'register' | 'login')}>
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/10">
              <TabsTrigger value="register" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Register
              </TabsTrigger>
              <TabsTrigger value="login" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                Login
              </TabsTrigger>
            </TabsList>
            <TabsContent value="register">
              <RegistrationForm onSwitchToLogin={() => setActiveTab('login')} />
            </TabsContent>
            <TabsContent value="login">
              <LoginForm onSuccess={handleLoginSuccess} />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Why Register Section */}
      <section className="relative z-10 py-12">
        <div className="container max-w-6xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-white md:text-4xl">
            কেন রেজিস্টার করবেন?
          </h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <Card className="glass-background border-white/10 transition-all hover:scale-105 hover:border-yellow-500/50">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-green-500/20 p-4">
                  <CheckCircle2 className="h-12 w-12 text-green-400" />
                </div>
                <h3 className="bengali-text text-xl font-bold text-white md:text-2xl">
                  ১০০% পেমেন্ট গ্যারান্টি।
                </h3>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="glass-background border-white/10 transition-all hover:scale-105 hover:border-yellow-500/50">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-blue-500/20 p-4">
                  <CheckCircle2 className="h-12 w-12 text-blue-400" />
                </div>
                <h3 className="bengali-text text-xl font-bold text-white md:text-2xl">
                  সহজ টাইপিং কাজ।
                </h3>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="glass-background border-white/10 transition-all hover:scale-105 hover:border-yellow-500/50">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-purple-500/20 p-4">
                  <Clock className="h-12 w-12 text-purple-400" />
                </div>
                <h3 className="bengali-text text-xl font-bold text-white md:text-2xl">
                  ২৪/৭ অ্যাডমিন সাপোর্ট।
                </h3>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Note */}
      <section className="relative z-10 pb-12">
        <div className="container max-w-4xl px-4">
          <div className="flex items-center justify-center gap-3 rounded-lg bg-green-500/10 border border-green-500/30 p-4 text-center">
            <Shield className="h-6 w-6 text-green-400" />
            <p className="bengali-text text-lg font-medium text-green-300">
              আপনার তথ্য আমাদের কাছে সম্পূর্ণ নিরাপদ।
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
