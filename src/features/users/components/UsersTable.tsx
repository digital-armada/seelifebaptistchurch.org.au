'use client';

import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
    type ColumnDef,
    type SortingState,
    type ColumnFiltersState,
} from '@tanstack/react-table';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUsers, useDeleteUser, useUpdateUser } from '../queries';
import { User } from '../types';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';

export function UsersTable() {
    const router = useRouter();
    const { data: users, isLoading, error } = useUsers();
    const deleteUser = useDeleteUser();
    const updateUser = useUpdateUser();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const columns: ColumnDef<User>[] = [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: ({ row }) => row.getValue('name') || 'N/A',
        },
        {
            accessorKey: 'email',
            header: 'Email',
            cell: ({ row }) => row.getValue('email'),
        },
        {
            accessorKey: 'role',
            header: 'Role',
            cell: ({ row }) => row.getValue('role'),
        },

        // {
        //     id: 'actions',
        //     header: 'Actions',
        //     cell: ({ row }) => (
        //         <div className='flex space-x-2'>
        //             <Button
        //                 variant='outline'
        //                 size='sm'
        //                 onClick={() =>
        //                     updateUser.mutate({
        //                         id: row.original.id,
        //                         data: {
        //                             role:
        //                                 row.original.role === 'ADMIN'
        //                                     ? 'USER'
        //                                     : 'ADMIN',
        //                         },
        //                     })
        //                 }
        //                 disabled={updateUser.isPending}>
        //                 {row.original.role === 'ADMIN' ? 'Demote' : 'Promote'}
        //             </Button>
        //             <Button
        //                 variant='outline'
        //                 size='sm'
        //                 onClick={() =>
        //                     router.push(
        //                         `/dashboard/users/${row.original.id}/edit`
        //                     )
        //                 }>
        //                 Edit
        //             </Button>
        //             <Button
        //                 variant='destructive'
        //                 size='sm'
        //                 onClick={() => deleteUser.mutate(row.original.id)}
        //                 disabled={deleteUser.isPending}>
        //                 Delete
        //             </Button>
        //         </div>
        //     ),
        // },
    ];

    const table = useReactTable({
        data: users || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        state: {
            sorting,
            columnFilters,
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='space-y-4'>
            <div className='flex items-center justify-between'>
                <Input
                    placeholder='Filter users by email...'
                    value={
                        (table
                            .getColumn('email')
                            ?.getFilterValue() as string) ?? ''
                    }
                    onChange={event =>
                        table
                            .getColumn('email')
                            ?.setFilterValue(event.target.value)
                    }
                    className='max-w-sm'
                />
            </div>
            <div className='rounded-md border'>
                <table className='w-full'>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className='border-b px-4 py-2 text-left'>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map(row => (
                                <tr
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                    className='border-b'>
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className='px-4 py-2'>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className='h-24 text-center'>
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className='flex items-center justify-end space-x-2 py-4'>
                <Button
                    variant='outline'
                    size='sm'
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}>
                    Previous
                </Button>
                <Button
                    variant='outline'
                    size='sm'
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}>
                    Next
                </Button>
            </div>
        </div>
    );
}
