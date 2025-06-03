export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
    > = T & {
        auth: {
            user: User;
        };
    };

export interface Project {
    id: number;
    name: string;
    color: string;
}

export interface Task {
    id: number;
    name: string;
    priority: number;
    projectId: number;
    createdAt: string;
    updatedAt: string;
}