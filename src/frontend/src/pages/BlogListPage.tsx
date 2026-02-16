import { Seo } from '../components/seo/Seo';
import { BlogPostCard } from '../components/blog/BlogPostCard';
import { AdPlaceholder } from '../components/monetization/AdPlaceholder';
import { useGetPosts } from '../hooks/useBlogPosts';
import { Loader2 } from 'lucide-react';

export default function BlogListPage() {
  const { data: posts, isLoading, error } = useGetPosts();

  return (
    <>
      <Seo
        title="Blog"
        description="Read our latest articles covering insights, tutorials, and stories on topics that matter."
        path="/blog"
      />
      <div className="container py-12 md:py-16">
        <div className="readable-text-block mb-12 text-center">
          <h1 className="neon-heading mb-4 text-4xl font-bold tracking-tight sm:text-5xl">Blog</h1>
          <p className="mx-auto max-w-2xl text-lg text-white">
            Insights, stories, and expertise on topics that inspire and inform.
          </p>
        </div>

        <AdPlaceholder variant="banner" className="mb-12" />

        {isLoading && (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="readable-card rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center">
            <p className="text-destructive">Failed to load blog posts. Please try again later.</p>
          </div>
        )}

        {posts && posts.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        {posts && posts.length === 0 && !isLoading && (
          <div className="readable-card rounded-lg border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">No blog posts available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </>
  );
}
