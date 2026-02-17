import { ExternalLink, Gift, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TimeBucksMegaEarningTaskCard() {
  const handleClick = () => {
    window.open('https://timebucks.com/?refID=228126934', '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="container py-12 md:py-16">
      <div className="glass-background mx-auto max-w-4xl rounded-2xl border-2 border-primary/30 p-8 shadow-2xl">
        {/* Badge */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-4 py-2 text-sm font-semibold text-yellow-300 shadow-lg">
            <Gift className="h-5 w-5" />
            <span>মেগা ইনকাম সোর্স</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="neon-heading mb-4 text-center text-3xl font-bold tracking-tight md:text-4xl">
          TimeBucks - মেগা ইনকাম সোর্স (কোনো ইনভেস্ট নেই)
        </h2>

        {/* Subtitle */}
        <p className="mb-6 text-center text-lg text-white md:text-xl">
          গেম খেলে, ভিডিও দেখে এবং সার্ভে করে প্রতিদিন $২-$৫ আয় করুন।
        </p>

        {/* Bonus Highlight */}
        <div className="mb-8 flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 shadow-lg">
          <DollarSign className="h-6 w-6 text-green-400" />
          <p className="text-lg font-semibold text-green-300">
            সাইন-আপ করলেই $১.০০ বোনাস ফ্রি!
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col items-center gap-4">
          <Button
            onClick={handleClick}
            size="lg"
            className="neon-button neon-button-primary group relative h-14 px-8 text-lg font-bold shadow-xl transition-all hover:scale-105"
          >
            <span className="flex items-center gap-2">
              এখনই ইনকাম শুরু করুন
              <ExternalLink className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>

          {/* Trust Note */}
          <p className="text-center text-sm text-white/80 md:text-base">
            এটি একটি আন্তর্জাতিক বিশ্বস্ত সাইট যা ১০ বছর ধরে পেমেন্ট দিচ্ছে।
          </p>
        </div>
      </div>
    </section>
  );
}
