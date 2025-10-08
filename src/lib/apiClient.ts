import { getUsers, updateUser, deleteUser } from '../features/users/actions';
import { registerUserAction as createUser } from '../features/auth/actions';
import {
    getStatements,
    getStatement,
    createOrUpdateStatement,
} from '../features/statement/actions';

export interface IApiClient {
    users: {
        getAll: () => Promise<{
            success: boolean;
            data?: any[];
            error?: string;
        }>;
        create: (
            data: any
        ) => Promise<{ success: boolean; data?: any; error?: string }>;
        update: (
            id: string,
            data: any
        ) => Promise<{ success: boolean; data?: any; error?: string }>;
        delete: (id: string) => Promise<{ success: boolean; error?: string }>;
    };
    statements: {
        getAll: () => Promise<{
            success: boolean;
            data?: any[];
            error?: string;
        }>;
        get: (id: string) => Promise<{
            success: boolean;
            data?: any;
            error?: string;
        }>;
        create: (
            data: any
        ) => Promise<{ success: boolean; data?: any; error?: string }>;
        update: (
            id: string,
            data: any
        ) => Promise<{ success: boolean; data?: any; error?: string }>;
    };
}

export class ApiClient implements IApiClient {
    users = {
        getAll: getUsers,
        create: createUser,
        update: updateUser,
        delete: deleteUser,
    };
    statements = {
        getAll: getStatements,
        get: getStatement,
        create: (data: any) => createOrUpdateStatement(data),
        update: (id: string, data: any) =>
            createOrUpdateStatement({ ...data, id }),
    };
}

// Default instance
export const apiClient = new ApiClient();
