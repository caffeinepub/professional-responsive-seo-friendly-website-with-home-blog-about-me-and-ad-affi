import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    title: string;
    content: string;
    published: Time;
    slug: string;
    excerpt: string;
}
export interface UserApprovalInfo {
    status: ApprovalStatus;
    principal: Principal;
}
export type Time = bigint;
export interface UserProfile {
    status: UserStatus;
    username: string;
    registeredAt: Time;
}
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
export enum UserStatus {
    Approved = "Approved",
    Rejected = "Rejected",
    Pending = "Pending"
}
export interface backendInterface {
    approveUser(userPrincipal: Principal): Promise<string>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createPost(title: string, slug: string, excerpt: string, content: string): Promise<string>;
    getAllUsers(): Promise<Array<UserProfile>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPost(slug: string): Promise<BlogPost | null>;
    getPosts(): Promise<Array<BlogPost>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isCallerApproved(): Promise<boolean>;
    listApprovals(): Promise<Array<UserApprovalInfo>>;
    loginUser(password: string): Promise<UserProfile>;
    registerUser(username: string, password: string): Promise<string>;
    requestApproval(): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setApproval(user: Principal, status: ApprovalStatus): Promise<void>;
}
