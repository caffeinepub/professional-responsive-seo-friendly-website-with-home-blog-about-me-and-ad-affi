export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image with responsive variants */}
      <div className="absolute inset-0">
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="/assets/generated/hero-bg-mobile.dim_1080x1350.png"
          />
          <img
            src="/assets/generated/hero-bg.dim_1600x900.png"
            alt="Hero Background"
            className="h-full w-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />
      </div>

      {/* Content */}
      <div className="container relative py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Headline - White and Bold */}
          <h1 className="mb-6 text-3xl font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] sm:text-4xl md:text-5xl lg:text-6xl">
            Welcome to H★S Online Earn Platform!
          </h1>

          {/* Bengali Sub-headline */}
          <div className="readable-text-block mb-10">
            <p className="bengali-text text-base leading-relaxed text-white/95 sm:text-lg md:text-xl lg:text-2xl font-normal tracking-wide">
              আসসালামু আলাইকুম, আমি Md. Habibur Rahman। আমাদের টিমে যুক্ত হয়ে সহজ টাইপিং এবং ডাটা এন্ট্রির কাজ করে আজই আয় শুরু করুন। কোনো অভিজ্ঞতা ছাড়াই ১০ মিনিটে কাজ শিখে নিন। এগুলো ছাড়াও আরও অনেক কাজ আপনি আমাদের এই ওয়েবসাইটে পেয়ে যাবেন।
              <br />
              প্রতিদিন নতুন নতুন কাজ পেতে ওয়েবটি জিভিট করুন.
            </p>
          </div>

          {/* Single CTA Button */}
          <div className="flex justify-center">
            <a
              href="https://www.facebook.com/share/1CPKURCrY8/"
              target="_blank"
              rel="noopener noreferrer"
              className="neon-button neon-button-primary inline-flex h-12 items-center justify-center rounded-md px-10 text-base font-semibold shadow-lg transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:h-14 md:px-12 md:text-lg"
            >
              Join My Team ★
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
