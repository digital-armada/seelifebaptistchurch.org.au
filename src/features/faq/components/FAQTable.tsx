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
import { useFAQs, useDeleteFAQ } from '../queries';
import { FAQ } from '../types';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';

export function FAQTable() {
    const router = useRouter();
    const { data: faqs, isLoading, error } = useFAQs();
    const deleteFAQ = useDeleteFAQ();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const columns: ColumnDef<FAQ>[] = [
        {
            accessorKey: 'question',
            header: 'Question',
            cell: ({ row }) => (
                <div
                    className='max-w-md truncate'
                    title={row.getValue('question')}>
                    {row.getValue('question')}
                </div>
            ),
        },
        {
            accessorKey: 'answer',
            header: 'Answer',
            cell: ({ row }) => (
                <div
                    className='max-w-md truncate'
                    title={row.getValue('answer')}>
                    {row.getValue('answer')}
                </div>
            ),
        },
        {
            accessorKey: 'createdAt',
            header: 'Created',
            cell: ({ row }) => {
                const date = new Date(row.getValue('createdAt'));
                return isNaN(date.getTime())
                    ? 'N/A'
                    : date.toLocaleDateString();
            },
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
                                `/dashboard/faq/${row.original.id}/edit`
                            )
                        }>
                        Edit
                    </Button>
                    <Button
                        variant='destructive'
                        size='sm'
                        onClick={() => deleteFAQ.mutate(row.original.id)}
                        disabled={deleteFAQ.isPending}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: faqs || [],
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
                    placeholder='Filter FAQs...'
                    value={
                        (table
                            .getColumn('question')
                            ?.getFilterValue() as string) ?? ''
                    }
                    onChange={event =>
                        table
                            .getColumn('question')
                            ?.setFilterValue(event.target.value)
                    }
                    className='max-w-sm'
                />
                <Button onClick={() => router.push('/dashboard/faq/new')}>
                    Add FAQ
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
