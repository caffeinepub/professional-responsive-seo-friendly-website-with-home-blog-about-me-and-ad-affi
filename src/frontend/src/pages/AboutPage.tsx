import { Seo } from '../components/seo/Seo';
import { AdPlaceholder } from '../components/monetization/AdPlaceholder';
import { Mail, MapPin, Briefcase } from 'lucide-react';
import { SiFacebook, SiX, SiLinkedin, SiGithub } from 'react-icons/si';

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Me"
        description="Learn more about me, my expertise, interests, and how to get in touch."
        path="/about"
      />
      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="readable-text-block mb-8">
            <h1 className="neon-heading text-4xl font-bold tracking-tight sm:text-5xl">About Me</h1>
          </div>

          <AdPlaceholder variant="banner" className="mb-12" />

          <section className="readable-card mb-12">
            <h2 className="neon-subheading mb-4 text-2xl font-semibold">Biography</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Welcome! I'm a passionate writer and content creator dedicated to sharing knowledge and insights
                on topics that matter. With years of experience in my field, I've developed a deep understanding
                of the subjects I cover and a commitment to delivering high-quality, engaging content.
              </p>
              <p>
                My journey began with a simple curiosity and has evolved into a mission to educate, inspire, and
                connect with readers from all walks of life. Through this blog, I aim to create a space where
                ideas can flourish and meaningful conversations can take place.
              </p>
              <p>
                When I'm not writing, you can find me exploring new technologies, reading the latest industry
                trends, or connecting with fellow professionals in the community.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <div className="readable-text-block mb-4">
              <h2 className="neon-subheading text-2xl font-semibold">Expertise & Interests</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="readable-card rounded-lg border border-border bg-card p-6">
                <Briefcase className="mb-3 h-6 w-6 text-primary" />
                <h3 className="mb-2 font-semibold">Professional Experience</h3>
                <p className="text-sm text-muted-foreground">
                  Extensive background in content creation, digital marketing, and strategic communication.
                </p>
              </div>
              <div className="readable-card rounded-lg border border-border bg-card p-6">
                <MapPin className="mb-3 h-6 w-6 text-primary" />
                <h3 className="mb-2 font-semibold">Areas of Focus</h3>
                <p className="text-sm text-muted-foreground">
                  Technology trends, personal development, industry insights, and practical how-to guides.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="readable-text-block mb-4">
              <h2 className="neon-subheading text-2xl font-semibold">Get in Touch</h2>
            </div>
            <div className="readable-card rounded-lg border border-border bg-card p-6">
              <div className="mb-6">
                <div className="mb-4 flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">contact@myblog.com</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Feel free to reach out for collaborations, questions, or just to say hello!
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold">Connect on Social Media</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-accent"
                    aria-label="Facebook"
                  >
                    <SiFacebook className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-accent"
                    aria-label="X (Twitter)"
                  >
                    <SiX className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-accent"
                    aria-label="LinkedIn"
                  >
                    <SiLinkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-accent"
                    aria-label="GitHub"
                  >
                    <SiGithub className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <AdPlaceholder variant="in-content" />
        </div>
      </div>
    </>
  );
}
