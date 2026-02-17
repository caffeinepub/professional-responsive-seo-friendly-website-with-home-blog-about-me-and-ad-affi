import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Headphones } from 'lucide-react';

export function TranscribeMeSectionCard() {
  return (
    <section className="container py-8 md:py-12">
      <div className="glass-background relative rounded-2xl border-2 border-blue-400/50 p-6 shadow-lg md:p-8">
        {/* Now Hiring Badge */}
        <Badge className="absolute right-4 top-4 bg-green-500 text-white hover:bg-green-600">
          Now Hiring
        </Badge>

        {/* Header with Icon */}
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-500/20">
            <Headphones className="h-6 w-6 text-blue-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              🎧 TranscribeMe - অডিও শুনে টাইপিং কাজ
            </h2>
          </div>
        </div>

        {/* Description */}
        <p className="mb-6 text-base leading-relaxed text-white/90 md:text-lg">
          আপনি কি ইংরেজি শুনে নির্ভুলভাবে টাইপ করতে পারেন? TranscribeMe একটি আন্তর্জাতিক প্ল্যাটফর্ম যেখানে ছোট ছোট অডিও ক্লিপ শুনে তা টাইপ করে প্রতি ঘণ্টায় ১৫-২২ ডলার পর্যন্ত আয় করা সম্ভব।
        </p>

        {/* Step-by-Step Guide */}
        <div className="mb-6 rounded-lg bg-white/5 p-5">
          <h3 className="mb-4 text-lg font-semibold text-blue-300">Step-by-Step Guide:</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/30 text-sm font-bold text-blue-300">
                ১
              </div>
              <div>
                <p className="font-medium text-white">রেজিস্ট্রেশন:</p>
                <p className="text-sm text-white/80">
                  প্রথমে 'কাজ শুরু করুন' বাটনে ক্লিক করে 'Transcriptionist' হিসেবে একাউন্ট খুলুন।
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/30 text-sm font-bold text-blue-300">
                ২
              </div>
              <div>
                <p className="font-medium text-white">পরীক্ষা:</p>
                <p className="text-sm text-white/80">
                  তাদের দেওয়া 'Style Guide' টি ভালো করে পড়ুন এবং একটি ছোট অডিও টেস্টে পাস করুন।
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/30 text-sm font-bold text-blue-300">
                ৩
              </div>
              <div>
                <p className="font-medium text-white">পেমেন্ট:</p>
                <p className="text-sm text-white/80">
                  ১০-২০ ডলার জমা হলেই পেপ্যাল (PayPal) এর মাধ্যমে টাকা তোলা যায় (যা পরে এয়ারটিএম দিয়ে বিকাশে নেওয়া সম্ভব)।
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Tip */}
        <div className="mb-6 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
          <p className="text-sm font-medium text-yellow-200">
            <span className="font-bold">Important Tip:</span> ভালো মানের হেডফোন ব্যবহার করলে কাজ করতে সুবিধা হবে এবং আয়ের সম্ভাবনা বাড়বে।
          </p>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50"
          >
            <a
              href="https://www.transcribeme.com/jobs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              এখনই কাজ শুরু করুন
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
