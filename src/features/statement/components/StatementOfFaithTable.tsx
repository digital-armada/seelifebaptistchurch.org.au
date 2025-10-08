'use client';

import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    type ColumnDef,
    type Row,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useStatements, useUpdateStatementOrder } from '../queries';
import { Statement } from '@/src/generated/prisma';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { GripVertical } from 'lucide-react';
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// REFACTORED: DraggableRow is simplified. It no longer needs the complex `isUpdating` prop.
// Its only job is to provide the dnd-kit context to the table row.
const DraggableRow = ({ row }: { row: Row<Statement> }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: row.original.id });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition: transition || 'none', // Prevent transition flicker on drop
        opacity: isDragging ? 0.8 : 1,
        zIndex: isDragging ? 1 : 0,
        position: 'relative',
    };

    return (
        <tr
            ref={setNodeRef}
            style={style}
            data-state={row.getIsSelected() && 'selected'}
            className='border-b bg-white'>
            {/* Drag Handle Cell */}
            <td className='px-4 py-2 align-middle w-[40px]'>
                <button
                    {...attributes}
                    {...listeners}
                    className='cursor-grab active:cursor-grabbing text-gray-500'>
                    <GripVertical size={18} />
                </button>
            </td>
            {/* Data Cells */}
            {row.getVisibleCells().map(cell => (
                <td key={cell.id} className='px-4 py-2 align-middle'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
            ))}
        </tr>
    );
};

// Main Table Component
export function StatementOfFaithTable() {
    const router = useRouter();
    // CHANGE: Renamed `initialData` to `statements` for clarity. This is our single source of truth.
    const { data: statements = [], isLoading, error } = useStatements();
    const updateOrderMutation = useUpdateStatementOrder();

    // REMOVED: The local `useState` for `data` is gone. We now rely entirely on React Query's cache.
    // REMOVED: The `useState` for `updatingRowId` is gone. It's no longer needed.

    // CHANGE: `dataIds` is now derived directly from the query data.
    const dataIds = useMemo(() => statements.map(({ id }) => id), [statements]);

    const columns = useMemo<ColumnDef<Statement>[]>(
        () => [
            {
                accessorKey: 'topic',
                header: 'Topic',
                cell: ({ row }) => row.getValue('topic'),
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
                                    `/dashboard/statement-of-faith/${row.original.id}/edit`
                                )
                            }>
                            Edit
                        </Button>
                        <Button
                            variant='ghost'
                            size='sm'
                            onClick={() =>
                                router.push(
                                    `/dashboard/statement-of-faith/${row.original.id}`
                                )
                            }>
                            View
                        </Button>
                    </div>
                ),
            },
        ],
        [router]
    );

    const table = useReactTable({
        // CHANGE: The table's data is now directly from the `useStatements` hook.
        data: statements,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getRowId: row => row.id,
    });

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            // NOTE: We no longer call `setData` here.
            const oldIndex = dataIds.indexOf(active.id as string);
            const newIndex = dataIds.indexOf(over.id as string);

            // Calculate the new order based on the current state from the query.
            const reorderedData = arrayMove(statements, oldIndex, newIndex);

            const updatePayload = reorderedData.map((item, index) => ({
                id: item.id,
                displayOrder: index,
            }));

            // We only call the mutation. The `onMutate` in our hook will handle the UI update.
            updateOrderMutation.mutate(updatePayload);
        }
    }

    if (isLoading) return <div>Loading statements...</div>;
    if (error) return <div>Error loading statements: {error.message}</div>;

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div className='space-y-4 w-full'>
                <div className='flex items-center justify-between w-full'>
                    <Input
                        placeholder='Filter statements...'
                        className='flex-1 max-w-md'
                    />
                    <Button
                        onClick={() =>
                            router.push('/dashboard/statement-of-faith/new')
                        }>
                        Add Statement
                    </Button>
                </div>
                <div className='rounded-md border w-full'>
                    <table className='w-full'>
                        <thead className='bg-gray-50'>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {/* Header for Drag Handle */}
                                    <th
                                        style={{ width: '40px' }}
                                        className='border-b px-4 py-2 text-left'></th>
                                    {headerGroup.headers.map(header => (
                                        <th
                                            key={header.id}
                                            style={{ width: header.getSize() }}
                                            className='border-b px-4 py-2 text-left text-sm font-medium text-gray-600'>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            <SortableContext
                                items={dataIds}
                                strategy={verticalListSortingStrategy}>
                                {table.getRowModel().rows.map(row => (
                                    <DraggableRow key={row.id} row={row} />
                                ))}
                            </SortableContext>
                        </tbody>
                    </table>
                </div>
            </div>
        </DndContext>
    );
}
