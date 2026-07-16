export interface User {
    id: string;
    name: string | null;
    email: string;
    role: string;
    createdAt: Date;
}

export interface CreateUserInput {
    name: string;
    email: string;
    password: string;
}

export interface UpdateUserInput {
    name?: string;
    email?: string;
}
