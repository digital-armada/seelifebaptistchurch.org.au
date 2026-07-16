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
import { useServices, useDeleteService } from '../queries';
import { ServiceTime } from '../types';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';

export function ServiceTimesTable() {
    const router = useRouter();
    const { data: services, isLoading, error } = useServices();
    const deleteService = useDeleteService();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const columns: ColumnDef<ServiceTime>[] = [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: ({ row }) => row.getValue('name'),
        },
        {
            accessorKey: 'description',
            header: 'Description',
            cell: ({ row }) => row.getValue('description') || 'N/A',
        },

        {
            accessorKey: 'time',
            header: 'Time',
            cell: ({ row }) => row.getValue('time'),
        },

        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className='flex space-x-2'>
                    <Button
                        variant='outline'
                        size='sm'
                        onClick={() =>
                            router.push(
                                `/dashboard/service-times/${row.original.id}/edit`
                            )
                        }>
                        Edit
                    </Button>
                    <Button
                        variant='destructive'
                        size='sm'
                        onClick={() => deleteService.mutate(row.original.id)}
                        disabled={deleteService.isPending}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: services || [],
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
                    placeholder='Filter services...'
                    value={
                        (table.getColumn('name')?.getFilterValue() as string) ??
                        ''
                    }
                    onChange={event =>
                        table
                            .getColumn('name')
                            ?.setFilterValue(event.target.value)
                    }
                    className='max-w-sm'
                />
                <Button
                    onClick={() => router.push('/dashboard/service-times/new')}>
                    Add Service Time
                </Button>
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
                                    No results.
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
