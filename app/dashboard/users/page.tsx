import { UsersTable } from '@/src/features/users/components/UsersTable';
import { CreateUserForm } from '@/src/features/users/components/CreateUserForm';

export default function UsersPage() {
    return (
        <div className='container mx-auto py-6'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-bold'>Users Management</h1>
            </div>
            <div className='space-y-6'>
                <UsersTable />
            </div>
        </div>
    );
}
