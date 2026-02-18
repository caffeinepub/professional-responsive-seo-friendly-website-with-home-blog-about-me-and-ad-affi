import { SiFacebook } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Seo } from '@/components/seo/Seo';

export default function SupportPage() {
  return (
    <>
      <Seo
        title="Contact Support - H★S Online Earn Platform"
        description="Get in touch with our administrators for help and support. Contact Habibur Rahman or Sumaiya for assistance with your online earning journey."
      />
      
      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold neon-text md:text-5xl">
              Contact Support
            </h1>
            <p className="text-lg text-white/80">
              Need help? Our administrators are here to assist you. Reach out to us on Facebook.
            </p>
          </div>

          {/* Admin Contact Section */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Admin 1: Habibur Rahman */}
            <Card className="glass-background border-cyan-500/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <SiFacebook className="h-8 w-8 text-blue-500" />
                  <div>
                    <CardTitle className="text-xl text-white">Habibur Rahman</CardTitle>
                    <CardDescription className="text-white/70">Administrator</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  size="lg"
                >
                  <a
                    href="https://www.facebook.com/md.habibur.rahman.62356"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contact Habibur
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Admin 2: Sumaiya / Sumi */}
            <Card className="glass-background border-cyan-500/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <SiFacebook className="h-8 w-8 text-blue-500" />
                  <div>
                    <CardTitle className="text-xl text-white">Sumaiya / Sumi</CardTitle>
                    <CardDescription className="text-white/70">Administrator</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  size="lg"
                >
                  <a
                    href="https://www.facebook.com/profile.php?id=61575236122760"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contact Sumi
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-sm text-white/60">
              Our administrators typically respond within 24 hours. Please be patient and provide clear details about your inquiry.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
