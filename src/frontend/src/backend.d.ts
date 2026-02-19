import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type UserLoginResponse = {
    __kind__: "error";
    error: string;
} | {
    __kind__: "success";
    success: UserLoginProfile;
};
export interface UserApprovalInfo {
    status: ApprovalStatus;
    principal: Principal;
}
export interface BlogPost {
    title: string;
    content: string;
    published: Time;
    slug: string;
    excerpt: string;
}
export type Time = bigint;
export interface UserPublicProfile {
    groupNumber: string;
    username: string;
    email: string;
    whatsappNumber: string;
    registeredAt: bigint;
}
export interface UserLoginProfile {
    groupNumber: string;
    username: string;
    email: string;
    whatsappNumber: string;
    registeredAt: bigint;
}
export type UserRegistrationResponse = {
    __kind__: "error";
    error: string;
} | {
    __kind__: "success";
    success: string;
};
export enum ApprovalStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createPost(title: string, slug: string, excerpt: string, content: string): Promise<string>;
    getAllPostSlugs(): Promise<Array<string>>;
    getAllUsers(): Promise<Array<UserPublicProfile>>;
    getCallerUserProfile(): Promise<UserPublicProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPost(slug: string): Promise<BlogPost>;
    getPosts(): Promise<Array<BlogPost>>;
    getUserProfile(user: Principal): Promise<UserPublicProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isCallerApproved(): Promise<boolean>;
    listApprovals(): Promise<Array<UserApprovalInfo>>;
    loginUser(emailOrUsername: string, password: string): Promise<UserLoginResponse>;
    registerUser(username: string, whatsappNumber: string, groupNumber: string, email: string, password: string): Promise<UserRegistrationResponse>;
    requestApproval(): Promise<void>;
    saveCallerUserProfile(profile: UserPublicProfile): Promise<void>;
    searchPosts(term: string): Promise<Array<BlogPost>>;
    setApproval(user: Principal, status: ApprovalStatus): Promise<void>;
}
