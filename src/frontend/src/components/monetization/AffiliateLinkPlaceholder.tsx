import { Tag } from 'lucide-react';

interface AffiliateLinkPlaceholderProps {
  title?: string;
  description?: string;
  className?: string;
}

export function AffiliateLinkPlaceholder({
  title = 'Recommended Product',
  description = 'This is a placeholder for an affiliate product recommendation.',
  className = '',
}: AffiliateLinkPlaceholderProps) {
  return (
    <div className={`rounded-lg border border-border bg-card p-6 shadow-sm ${className}`}>
      <div className="mb-3 flex items-center gap-2">
        <Tag className="h-5 w-5 text-muted-foreground" />
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Affiliate Link
        </span>
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="mb-4 text-sm text-muted-foreground">{description}</p>
      <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
        Learn More
      </button>
    </div>
  );
}
