import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

interface TaskInteractionCardProps {
  taskUrl: string;
}

export function TaskInteractionCard({ taskUrl }: TaskInteractionCardProps) {
  const [secretCode, setSecretCode] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleStartWork = () => {
    window.open(taskUrl, '_blank');
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
    <div className="glass-background mx-auto max-w-2xl rounded-2xl p-8 md:p-12">
      <div className="mb-8 flex justify-center">
        <Button
          onClick={handleStartWork}
          size="lg"
          className="neon-button neon-button-primary gap-2 text-lg font-semibold"
        >
          <ExternalLink className="h-5 w-5" />
          Start Work
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="secretCode" className="text-lg text-white">
            Secret Code
          </Label>
          <Input
            id="secretCode"
            type="text"
            value={secretCode}
            onChange={(e) => setSecretCode(e.target.value)}
            placeholder="Enter the secret code here..."
            className="h-12 text-lg"
            required
          />
        </div>

        {showSuccess && (
          <div className="flex items-center justify-center gap-2 rounded-lg border border-green-500/50 bg-green-500/10 p-4 text-green-400">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold">Code submitted successfully!</span>
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
  );
}
