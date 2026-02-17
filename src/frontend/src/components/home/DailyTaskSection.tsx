import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

const TASK_LINKS = [
  'https://shrinkme.click/1BpQ6Y',
  'https://shrinkme.click/wXy5YO',
  'https://shrinkme.click/LyCUCQ',
  'https://shrinkme.click/6YWHdYr',
  'https://shrinkme.click/wBwfvUs',
  'https://shrinkme.click/dJrUfce',
  'https://shrinkme.click/MC3uQuqi',
  'https://shrinkme.click/BXAKA',
  'https://shrinkme.click/883CWHJn',
  'https://shrinkme.click/CLVZGXQ',
  'https://shrinkme.click/REFUkV',
  'https://shrinkme.click/PKV1b',
  'https://shrinkme.click/pQTjkW',
  'https://shrinkme.click/N08V2STC',
  'https://shrinkme.click/9rP6iK',
];

export function DailyTaskSection() {
  const [secretCode, setSecretCode] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleStartTask = () => {
    const randomIndex = Math.floor(Math.random() * TASK_LINKS.length);
    const randomLink = TASK_LINKS[randomIndex];
    window.open(randomLink, '_blank');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (secretCode.trim()) {
      // Show success message
      setShowSuccess(true);
      
      // Clear the input
      setSecretCode('');
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  return (
    <section className="relative py-12 md:py-16">
      <div className="container">
        <div className="glass-background mx-auto max-w-4xl rounded-2xl p-8 md:p-12">
          <h2 className="neon-heading mb-6 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Daily Task
          </h2>
          
          <div className="mb-8 rounded-lg border border-primary/30 bg-primary/5 p-6">
            <p className="text-center text-lg leading-relaxed text-white md:text-xl">
              এখানে আনলিমিটেড কাজ আছে। প্রতিবার বাটনে ক্লিক করলে নতুন ভিডিও বা ফটো আসবে। লিঙ্কে গিয়ে ক্যাপশন বা কমেন্ট থেকে গোপন কোডটি সংগ্রহ করে নিচে জমা দিন।
            </p>
          </div>

          <div className="mb-8 flex justify-center">
            <Button
              onClick={handleStartTask}
              size="lg"
              className="neon-button neon-button-primary gap-2 text-lg font-semibold"
            >
              <ExternalLink className="h-5 w-5" />
              কাজ শুরু করুন
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="secretCode" className="text-lg text-white">
                গোপন কোড জমা দিন
              </Label>
              <Input
                id="secretCode"
                type="text"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                placeholder="এখানে গোপন কোড লিখুন..."
                className="h-12 text-lg"
                required
              />
            </div>

            {showSuccess && (
              <div className="flex items-center justify-center gap-2 rounded-lg border border-green-500/50 bg-green-500/10 p-4 text-green-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-semibold">কোড সফলভাবে জমা হয়েছে!</span>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full text-lg font-semibold"
              disabled={!secretCode.trim()}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
