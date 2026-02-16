import { useParams } from '@tanstack/react-router';
import { Seo } from '../components/seo/Seo';
import { AdPlaceholder } from '../components/monetization/AdPlaceholder';
import { AffiliateLinkPlaceholder } from '../components/monetization/AffiliateLinkPlaceholder';
import { useGetPost } from '../hooks/useBlogPosts';
import { Calendar, Loader2 } from 'lucide-react';

export default function BlogPostPage() {
  const { slug } = useParams({ from: '/blog/$slug' });
  const { data: post, isLoading, error } = useGetPost(slug);

  if (isLoading) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container py-12">
        <div className="readable-card rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center">
          <p className="text-destructive">Blog post not found or failed to load.</p>
          <a
            href="/blog"
            className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Back to Blog
          </a>
        </div>
      </div>
    );
  }

  const publishedDate = new Date(Number(post.published) / 1000000);
  const formattedDate = publishedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        type="article"
        publishedTime={publishedDate.toISOString()}
        path={`/blog/${post.slug}`}
      />
      <article className="container py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <header className="readable-text-block mb-8">
            <h1 className="neon-heading mb-4 text-4xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>
            <div className="flex items-center gap-2 text-white">
              <Calendar className="h-4 w-4" />
              <time dateTime={publishedDate.toISOString()}>{formattedDate}</time>
            </div>
          </header>

          <AdPlaceholder variant="banner" className="mb-8" />

          <div className="readable-card prose prose-lg max-w-none dark:prose-invert">
            <p className="lead text-xl text-muted-foreground">{post.excerpt}</p>
            <div className="mt-6 whitespace-pre-wrap">{post.content}</div>
          </div>

          <div className="mt-12">
            <AdPlaceholder variant="in-content" className="mb-8" />
          </div>

          <div className="mt-8">
            <AffiliateLinkPlaceholder
              title="Recommended Resource"
              description="Check out this amazing product that complements the topics discussed in this article."
            />
          </div>

          <div className="mt-12 border-t border-border pt-8">
            <a
              href="/blog"
              className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              ← Back to Blog
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
