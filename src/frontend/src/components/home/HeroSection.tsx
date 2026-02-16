export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-banner.dim_1600x600.png"
          alt="Hero Banner"
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
      </div>
      <div className="container relative py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="readable-text-block">
            <h1 className="neon-heading mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Welcome to My Blog
            </h1>
            <p className="mb-8 text-lg text-white sm:text-xl md:text-2xl">
              Discover insights, stories, and expertise on topics that inspire and inform. Join me on a journey of learning and growth.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="/blog"
              className="neon-button neon-button-primary inline-flex h-11 items-center justify-center rounded-md px-8 text-sm font-medium shadow transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Explore Articles
            </a>
            <a
              href="/about"
              className="neon-button neon-button-secondary inline-flex h-11 items-center justify-center rounded-md border px-8 text-sm font-medium shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
