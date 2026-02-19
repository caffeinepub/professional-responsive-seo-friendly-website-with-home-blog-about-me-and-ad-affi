import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { 
  UserRegistrationResponse, 
  UserLoginResponse, 
  UserPublicProfile,
  UserApprovalInfo,
  ApprovalStatus,
  UserRole
} from '../backend';
import { Principal } from '@icp-sdk/core/principal';

// Registration mutation
export function useRegisterUser() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<UserRegistrationResponse, Error, {
    username: string;
    whatsappNumber: string;
    groupNumber: string;
    email: string;
    password: string;
  }>({
    mutationFn: async (data) => {
      if (!actor) throw new Error('Actor not available');
      return actor.registerUser(
        data.username,
        data.whatsappNumber,
        data.groupNumber,
        data.email,
        data.password
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

// Login mutation
export function useLoginUser() {
  const { actor } = useActor();

  return useMutation<UserLoginResponse, Error, {
    emailOrUsername: string;
    password: string;
  }>({
    mutationFn: async (data) => {
      if (!actor) throw new Error('Actor not available');
      return actor.loginUser(data.emailOrUsername, data.password);
    },
  });
}

// Check if caller is approved
export function useIsCallerApproved() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isApproved'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerApproved();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

// Check if caller is admin
export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

// Get all users (admin only)
export function useGetAllUsers() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<UserPublicProfile[]>({
    queryKey: ['users'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllUsers();
    },
    enabled: !!actor && !actorFetching,
  });
}

// List all approvals (admin only)
export function useListApprovals() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<UserApprovalInfo[]>({
    queryKey: ['approvals'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listApprovals();
    },
    enabled: !!actor && !actorFetching,
  });
}

// Set approval status (admin only)
export function useSetApproval() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<void, Error, {
    user: Principal;
    status: ApprovalStatus;
  }>({
    mutationFn: async (data) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setApproval(data.user, data.status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approvals'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
