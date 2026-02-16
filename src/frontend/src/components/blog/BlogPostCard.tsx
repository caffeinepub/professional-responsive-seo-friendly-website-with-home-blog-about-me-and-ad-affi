import { Link } from '@tanstack/react-router';
import { Calendar } from 'lucide-react';
import type { BlogPost } from '../../backend';

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const publishedDate = new Date(Number(post.published) / 1000000);
  const formattedDate = publishedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="group rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <Link to="/blog/$slug" params={{ slug: post.slug }} className="block">
        <h2 className="mb-2 text-2xl font-bold tracking-tight transition-colors group-hover:text-primary">
          {post.title}
        </h2>
        <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <time dateTime={publishedDate.toISOString()}>{formattedDate}</time>
        </div>
        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
        <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
          Read more →
        </span>
      </Link>
    </article>
  );
}
