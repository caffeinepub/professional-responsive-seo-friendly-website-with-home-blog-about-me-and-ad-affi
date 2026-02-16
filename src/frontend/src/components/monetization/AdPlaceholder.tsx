import { ExternalLink } from 'lucide-react';

interface AdPlaceholderProps {
  variant?: 'banner' | 'sidebar' | 'in-content';
  className?: string;
}

export function AdPlaceholder({ variant = 'banner', className = '' }: AdPlaceholderProps) {
  const variantStyles = {
    banner: 'h-24 md:h-32',
    sidebar: 'h-64',
    'in-content': 'h-48 md:h-56',
  };

  return (
    <div
      className={`flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 ${variantStyles[variant]} ${className}`}
    >
      <div className="text-center">
        <ExternalLink className="mx-auto mb-2 h-6 w-6 text-muted-foreground/50" />
        <p className="text-sm font-medium text-muted-foreground/70">Advertisement Space</p>
        <p className="text-xs text-muted-foreground/50">{variant}</p>
      </div>
    </div>
  );
}
