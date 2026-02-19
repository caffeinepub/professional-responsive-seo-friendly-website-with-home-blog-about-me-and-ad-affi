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
        console.error('Failed to fetch approvals - Full error:', error);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        throw new Error(
          `Failed to load approvals: ${error.message || 'Unknown error'}`
        );
      }
    },
    enabled: !!actor && !actorFetching,
    retry: 2,
    retryDelay: 1000,
  });
}

export function useApproveUser() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userPrincipal: Principal) => {
      if (!actor) throw new Error('Actor not available');
      try {
        const result = await actor.approveUser(userPrincipal);
        return result;
      } catch (error: any) {
        console.error('Failed to approve user:', error);
        throw new Error(
          error.message || 'Failed to approve user in backend canister'
        );
      }
    },
    onSuccess: () => {
      // Invalidate both queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
      queryClient.invalidateQueries({ queryKey: ['allApprovals'] });
    },
  });
}

// ============================================================================
// APPROVAL QUERIES (for component compatibility)
// ============================================================================

export function useIsCallerApproved() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerApproved'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerApproved();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      try {
        const isAdmin = await actor.isCallerAdmin();
        console.log('isCallerAdmin result:', isAdmin);
        return isAdmin;
      } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
      }
    },
    enabled: !!actor && !actorFetching,
    retry: 1,
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
      if (!actor) return [];
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
      if (!actor) return null;
      return actor.getPost(slug);
    },
    enabled: !!actor && !actorFetching && !!slug,
  });
}
