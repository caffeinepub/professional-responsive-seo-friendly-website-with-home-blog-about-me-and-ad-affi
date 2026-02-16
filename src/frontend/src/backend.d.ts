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
export type Time = bigint;
export interface backendInterface {
    createPost(title: string, slug: string, excerpt: string, content: string): Promise<string>;
    getAllPostSlugs(): Promise<Array<string>>;
    getPost(slug: string): Promise<BlogPost>;
    getPosts(): Promise<Array<BlogPost>>;
    searchPosts(term: string): Promise<Array<BlogPost>>;
}
