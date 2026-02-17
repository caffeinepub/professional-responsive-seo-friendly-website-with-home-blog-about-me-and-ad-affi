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
        <div className="mx-auto max-w-4xl text-center">
          <div className="readable-text-block">
            <p className="text-lg leading-relaxed text-white sm:text-xl md:text-2xl lg:text-3xl font-light tracking-wide drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]">
              Assalamu Alaikum, I am <span className="font-semibold text-yellow-200">Md. Habibur Rahman</span>. I am working on professional typing projects in international marketplaces and building a skilled working team here. You can join my team, learn simple typing tasks in 10-15 minutes, and start earning with us.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mt-10">
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
