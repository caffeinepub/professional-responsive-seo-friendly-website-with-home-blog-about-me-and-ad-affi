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
      if (!actor) throw new Error('Actor not available');
      try {
        console.log('Calling getAllUsers...');
        const users = await actor.getAllUsers();
        console.log('getAllUsers response:', users);
        return users;
      } catch (error: any) {
        console.error('Failed to fetch users - Full error:', error);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        throw new Error(
          `Failed to load users: ${error.message || 'Unknown error'}`
        );
      }
    },
    enabled: !!actor && !actorFetching,
    retry: 2,
    retryDelay: 1000,
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
