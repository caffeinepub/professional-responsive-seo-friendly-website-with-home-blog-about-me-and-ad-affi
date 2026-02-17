import { CheckCircle2, AlertCircle } from 'lucide-react';

export function TimeBucksStepByStepGuideSection() {
  const steps = [
    {
      number: '১',
      title: 'সাইন-আপ করুন',
      description:
        'প্রথমে উপরের বাটনে ক্লিক করে আপনার ইমেইল দিয়ে একটি একাউন্ট তৈরি করুন। (ফেসবুক দিয়েও লগইন করতে পারেন)।',
    },
    {
      number: '২',
      title: 'ইমেইল ভেরিফাই',
      description:
        'আপনার ইমেইলে একটি লিঙ্ক যাবে, সেখানে ক্লিক করে একাউন্টটি ভেরিফাই করুন। ভেরিফাই করলেই আপনি $১.০০ বোনাস পাবেন।',
    },
    {
      number: '৩',
      title: 'প্রোফাইল সম্পন্ন করুন',
      description: 'সেটিংস থেকে আপনার নাম, ঠিকানা ও প্রোফাইল তথ্য পূরণ করুন।',
    },
    {
      number: '৪',
      title: 'কাজ শুরু করুন',
      description:
        "মেনু থেকে 'Earn' বাটনে ক্লিক করুন। এখানে 'Surveys', 'Content', এবং 'Tasks' এর ভেতর অনেক ছোট ছোট কাজ পাবেন। ভিডিও দেখে বা ক্লিক করেও আয় করা যায়।",
    },
    {
      number: '৫',
      title: 'পেমেন্ট নিন',
      description:
        'আপনার একাউন্টে ১০ ডলার জমা হলেই আপনি Airtm বা Payeer-এর মাধ্যমে টাকা তুলে নিতে পারবেন, যা পরে বিকাশ বা নগদে নেওয়া যায়।',
    },
  ];

  return (
    <section className="container pb-12 md:pb-16">
      <div className="glass-background mx-auto max-w-4xl rounded-2xl p-8 shadow-xl">
        {/* Heading */}
        <h2 className="neon-heading mb-8 text-center text-2xl font-bold tracking-tight md:text-3xl">
          কিভাবে TimeBucks থেকে ইনকাম করবেন? (সম্পূর্ণ নিয়ম)
        </h2>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex gap-4 rounded-lg border border-primary/20 bg-background/30 p-5 shadow-md transition-all hover:border-primary/40 hover:shadow-lg"
            >
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-lg font-bold text-white shadow-lg">
                  {step.number}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-white">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  {step.title}
                </h3>
                <p className="text-white/90">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Special Note */}
        <div className="mt-8 flex items-start gap-3 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4 shadow-md">
          <AlertCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-yellow-400" />
          <div>
            <p className="font-semibold text-yellow-300">বিশেষ দ্রষ্টব্য:</p>
            <p className="text-white/90">
              প্রতিদিন নতুন নতুন কাজ আসে, তাই প্রতিদিন অন্তত একবার সাইটটি চেক করবেন।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
