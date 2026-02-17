import { HeroSection } from '../components/home/HeroSection';
import { WelcomeSection } from '../components/home/WelcomeSection';
import { DailyTaskSection } from '../components/home/DailyTaskSection';
import { TimeBucksMegaEarningTaskCard } from '../components/home/TimeBucksMegaEarningTaskCard';
import { TimeBucksStepByStepGuideSection } from '../components/home/TimeBucksStepByStepGuideSection';
import { TranscribeMeSectionCard } from '../components/home/TranscribeMeSectionCard';
import { AdsterraNativeBanner } from '../components/monetization/AdsterraNativeBanner';
import { Seo } from '../components/seo/Seo';
import { Newspaper, Target, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <Seo
        title="Home"
        description="Welcome to MHS Habibur Blog - Discover insights on online income strategies, digital marketing tactics, and expertise to help you succeed in the digital economy."
        path="/"
      />
      <WelcomeSection />
      <HeroSection />
      <DailyTaskSection />
      <TimeBucksMegaEarningTaskCard />
      <TimeBucksStepByStepGuideSection />
      <TranscribeMeSectionCard />

      <section className="container py-12 md:py-16">
        <AdsterraNativeBanner className="mb-12" />

        <div className="grid gap-8 md:grid-cols-3">
          <div className="glass-background rounded-lg border border-border p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Newspaper className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-white">Quality Content</h2>
            <p className="text-white/90">
              In-depth articles and insights crafted with care and expertise to help you learn and grow.
            </p>
          </div>

          <div className="glass-background rounded-lg border border-border p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-white">Focused Topics</h2>
            <p className="text-white/90">
              Carefully curated content covering the subjects that matter most to our community.
            </p>
          </div>

          <div className="glass-background rounded-lg border border-border p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-white">Regular Updates</h2>
            <p className="text-white/90">
              Fresh perspectives and new articles published regularly to keep you informed and engaged.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container">
          <div className="glass-background mx-auto max-w-3xl rounded-2xl p-8">
            <h2 className="neon-heading mb-8 text-center text-3xl font-bold tracking-tight">Latest from the Blog</h2>
            <div className="text-center">
              <p className="mb-6 text-lg text-white">
                Explore our latest articles covering a wide range of topics designed to inform, inspire, and engage.
              </p>
              <a
                href="/blog"
                className="neon-button neon-button-primary inline-flex h-11 items-center justify-center rounded-md px-8 text-sm font-medium shadow transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                View All Posts
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
