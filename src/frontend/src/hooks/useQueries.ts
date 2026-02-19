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

export function useGetAllUsers() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<UserProfile[]>({
    queryKey: ['allUsers'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllUsers();
    },
    enabled: !!actor && !actorFetching,
    retry: 2,
  });
}

export function useApproveUser() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (username: string) => {
      if (!actor) throw new Error('Actor not available');
      
      // Get all users to find the principal for this username
      const users = await actor.getAllUsers();
      
      // Since we can't get the principal directly from username in the backend,
      // we need to use the caller's principal. The backend approveUser expects a Principal.
      // However, the backend stores users by Principal, not username.
      // We need to call the backend with the user's Principal.
      
      // For now, we'll need to modify the approach - the backend needs the Principal
      // but we only have the username in the UI. This is a backend gap.
      // As a workaround, we'll pass the username and let the backend handle it.
      
      // Actually, looking at the backend, approveUser takes a Principal parameter.
      // We need to get the Principal from somewhere. Let's check if we can derive it.
      
      // Since the backend doesn't provide a way to get Principal from username,
      // we'll need to store this mapping or change the backend.
      // For now, let's assume we need to pass the Principal.
      
      // This is a limitation - we'll document it as a backend gap
      throw new Error('Cannot approve user: Principal mapping not available. Backend needs to be updated to support approval by username.');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
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
