import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Principal } from '@dfinity/principal';
import type { UserProfile } from '../backend';

// ============================================================================
// USER MANAGEMENT QUERIES
// ============================================================================

export function useRegisterUser() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.registerUser(username, password);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
    },
  });
}

export function useLoginUser() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({ password }: { password: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.loginUser(password);
    },
  });
}

// Extended UserProfile with Principal for admin operations
export interface UserProfileWithPrincipal extends UserProfile {
  principal: Principal;
}

export function useGetAllUsers() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<UserProfile[]>({
    queryKey: ['allUsers'],
    queryFn: async () => {
      if (!actor) {
        console.error('Actor not available for getAllUsers');
        throw new Error('Backend connection not available. Please refresh the page.');
      }
      
      try {
        console.log('Calling getAllUsers with actor:', !!actor);
        const users = await actor.getAllUsers();
        console.log('getAllUsers response:', users);
        return users;
      } catch (error: any) {
        console.error('Failed to fetch users - Full error:', error);
        console.error('Error message:', error.message);
        console.error('Error name:', error.name);
        console.error('Error constructor:', error.constructor?.name);
        
        // Provide more specific error messages
        if (error.message?.includes('Unauthorized')) {
          throw new Error('Unauthorized: You must be logged in as an admin to view users');
        } else if (error.message?.includes('has no update method')) {
          throw new Error('Backend method not found. The canister may need to be redeployed.');
        } else if (error.message?.includes('Canister') || error.message?.includes('canister')) {
          throw new Error(`Backend canister error: ${error.message}`);
        } else {
          throw new Error(
            `Failed to load users: ${error.message || 'Unknown backend error. Please check the console for details.'}`
          );
        }
      }
    },
    enabled: !!actor && !actorFetching,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
  });
}

export function useGetAllApprovals() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ['allApprovals'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      try {
        console.log('Calling listApprovals...');
        const approvals = await actor.listApprovals();
        console.log('listApprovals response:', approvals);
        return approvals;
      } catch (error: any) {
        console.error('Failed to fetch approvals:', error);
        throw new Error(
          `Failed to load approvals: ${error.message || 'Unknown error'}`
        );
      }
    },
    enabled: !!actor && !actorFetching,
    retry: 2,
  });
}

export function useApproveUser() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userPrincipal: Principal) => {
      if (!actor) throw new Error('Actor not available');
      return actor.approveUser(userPrincipal);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
      queryClient.invalidateQueries({ queryKey: ['allApprovals'] });
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching,
  });
}

// ============================================================================
// BLOG POST QUERIES
// ============================================================================

export function useGetPosts() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getPosts();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetPost(slug: string) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ['post', slug],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getPost(slug);
    },
    enabled: !!actor && !actorFetching && !!slug,
  });
}

export function useSearchPosts(searchTerm: string) {
  const { data: posts, ...rest } = useGetPosts();

  const filteredPosts = posts?.filter((post) => {
    const term = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(term) ||
      post.excerpt.toLowerCase().includes(term) ||
      post.content.toLowerCase().includes(term)
    );
  });

  return {
    data: filteredPosts,
    ...rest,
  };
}

export function useCreatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      slug,
      excerpt,
      content,
    }: {
      title: string;
      slug: string;
      excerpt: string;
      content: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createPost(title, slug, excerpt, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
