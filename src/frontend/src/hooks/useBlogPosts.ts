import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { BlogPost } from '../backend';
import { samplePosts } from '../lib/blogSampleFallback';

export function useGetPosts() {
  const { actor, isFetching } = useActor();

  return useQuery<BlogPost[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      if (!actor) return samplePosts;
      try {
        const posts = await actor.getPosts();
        return posts.length > 0 ? posts : samplePosts;
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        return samplePosts;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPost(slug: string) {
  const { actor, isFetching } = useActor();

  return useQuery<BlogPost | null>({
    queryKey: ['post', slug],
    queryFn: async () => {
      if (!actor) {
        return samplePosts.find((p) => p.slug === slug) || null;
      }
      try {
        const post = await actor.getPost(slug);
        return post;
      } catch (error) {
        console.error('Failed to fetch post:', error);
        return samplePosts.find((p) => p.slug === slug) || null;
      }
    },
    enabled: !!actor && !isFetching && !!slug,
  });
}

export function useSearchPosts(term: string) {
  const { actor, isFetching } = useActor();

  return useQuery<BlogPost[]>({
    queryKey: ['posts', 'search', term],
    queryFn: async () => {
      // Backend doesn't have searchPosts, so we do client-side filtering
      if (!actor) {
        return samplePosts.filter(
          (post) =>
            post.title.toLowerCase().includes(term.toLowerCase()) ||
            post.content.toLowerCase().includes(term.toLowerCase())
        );
      }
      try {
        const posts = await actor.getPosts();
        return posts.filter(
          (post) =>
            post.title.toLowerCase().includes(term.toLowerCase()) ||
            post.content.toLowerCase().includes(term.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(term.toLowerCase())
        );
      } catch (error) {
        console.error('Failed to search posts:', error);
        return samplePosts.filter(
          (post) =>
            post.title.toLowerCase().includes(term.toLowerCase()) ||
            post.content.toLowerCase().includes(term.toLowerCase())
        );
      }
    },
    enabled: !!actor && !isFetching && term.length > 0,
  });
}
