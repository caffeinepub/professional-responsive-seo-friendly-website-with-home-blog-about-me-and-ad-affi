import { HeroSection } from '../components/home/HeroSection';
import { AdPlaceholder } from '../components/monetization/AdPlaceholder';
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
      <HeroSection />

      <section className="container py-12 md:py-16">
        <AdPlaceholder variant="banner" className="mb-12" />

        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Newspaper className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">Quality Content</h2>
            <p className="text-muted-foreground">
              In-depth articles and insights crafted with care and expertise to help you learn and grow.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">Focused Topics</h2>
            <p className="text-muted-foreground">
              Carefully curated content covering the subjects that matter most to our community.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">Regular Updates</h2>
            <p className="text-muted-foreground">
              Fresh perspectives and new articles published regularly to keep you informed and engaged.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">Latest from the Blog</h2>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-6 text-lg text-muted-foreground">
              Explore our latest articles covering a wide range of topics designed to inform, inspire, and engage.
            </p>
            <a
              href="/blog"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              View All Posts
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
