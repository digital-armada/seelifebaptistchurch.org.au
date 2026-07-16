'use client';

import { useUsers, useDeleteUser } from '../queries';

export function UserList() {
    const { data: users, isLoading, error } = useUsers();
    const deleteUser = useDeleteUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h2>Users</h2>
            <ul>
                {users?.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                        <button
                            onClick={() => deleteUser.mutate(user.id)}
                            disabled={deleteUser.isPending}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
