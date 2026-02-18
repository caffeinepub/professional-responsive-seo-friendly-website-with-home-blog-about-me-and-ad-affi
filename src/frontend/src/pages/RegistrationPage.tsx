import { Link } from '@tanstack/react-router';
import { Seo } from '../components/seo/Seo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Shield, Clock } from 'lucide-react';
import { registrationConfig } from '../lib/registrationConfig';

export default function RegistrationPage() {
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
        <div className="container max-w-4xl px-4">
          <div className="glass-background rounded-2xl border border-white/10 p-6 shadow-2xl md:p-8">
            {registrationConfig.googleFormEmbedUrl ? (
              <div className="w-full overflow-hidden rounded-lg">
                <iframe
                  src={registrationConfig.googleFormEmbedUrl}
                  width="100%"
                  height="1200"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  className="min-h-[800px] w-full md:min-h-[1000px]"
                  title="Registration Form"
                  style={{ border: 'none' }}
                >
                  Loading…
                </iframe>
              </div>
            ) : (
              <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-white/20 bg-black/20 p-8">
                <div className="text-center">
                  <div className="mb-4 text-6xl">📝</div>
                  <h3 className="mb-2 text-xl font-semibold text-white">Registration Form</h3>
                  <p className="bengali-text text-white/70">
                    রেজিস্ট্রেশন ফর্ম এখানে প্রদর্শিত হবে
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* CTA Button */}
          <div className="mt-8 text-center">
            <Button
              asChild
              size="lg"
              className="bengali-text bg-gradient-to-r from-yellow-500 to-yellow-600 px-8 py-6 text-lg font-bold text-black shadow-lg transition-all hover:scale-105 hover:from-yellow-400 hover:to-yellow-500 hover:shadow-xl md:text-xl"
            >
              <Link to="/tasks/task-1">
                রেজিস্ট্রেশন শেষ? এখানে ক্লিক করে কাজ শুরু করুন
              </Link>
            </Button>
          </div>
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
