'use client';

import {
    useFieldArray,
    Control,
    UseFormRegister,
    useWatch,
} from 'react-hook-form';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { PlusCircle, Trash2 } from 'lucide-react';

interface StatementNodeFormProps {
    control: Control<any>;
    register: any;
    path: string;
    onRemove: () => void;
    isRoot?: boolean;
}

export function StatementNodeForm({
    control,
    register,
    path,
    onRemove,
    isRoot = false,
}: StatementNodeFormProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `${path}.subStatements` as any,
    });

    // Watch form values for preview
    const watchedValues = useWatch({
        control,
    });

    const addSubStatement = () => {
        // Calculate the next displayOrder based on existing fields
        const maxDisplayOrder =
            fields.length > 0
                ? Math.max(...fields.map((_, index) => index))
                : 0;
        append({
            topic: '',
            content: '',
            bibleReferences: '',
            displayOrder: maxDisplayOrder + 1,
            subStatements: [],
        });
    };

    return (
        <div
            className={`space-y-4 rounded-lg border p-4 ${
                isRoot ? 'border-gray-300' : 'border-gray-200 bg-gray-50/50'
            }`}>
            <div className='flex items-center justify-between'>
                <h3 className='font-medium'>
                    {isRoot ? 'Main Statement' : 'Sub-Statement'}
                </h3>
                {!isRoot && (
                    <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        onClick={onRemove}
                        className='text-red-500 hover:text-red-700 h-8 w-8'>
                        <Trash2 className='h-4 w-4' />
                    </Button>
                )}
            </div>

            <div className='w-full'>
                <label className='block text-sm font-medium mb-1'>Topic</label>
                <Input
                    {...register(`${path}.topic`)}
                    placeholder='e.g., The Scriptures'
                    className='w-full'
                />
            </div>

            <div className='w-full'>
                <label className='block text-sm font-medium mb-1'>
                    Content
                </label>
                <Textarea
                    {...register(`${path}.content`)}
                    placeholder='Enter the statement content...'
                    className='w-full min-h-[120px] resize-y'
                    rows={4}
                />
            </div>

            <div className='w-full'>
                <label className='block text-sm font-medium mb-1'>
                    Bible References
                </label>
                <Textarea
                    {...register(`${path}.bibleReferences`)}
                    placeholder='e.g., 2 Tim 3:16-17; John 1:1; Gen 1:1'
                    className='w-full min-h-[80px] resize-y'
                    rows={2}
                />
                <p className='text-xs text-gray-500 mt-1'>
                    Separate multiple references with semicolons (;)
                </p>
            </div>

            <div>
                <label className='block text-sm font-medium mb-1'>
                    Display Order
                </label>
                <Input
                    type='number'
                    {...register(`${path}.displayOrder`, {
                        valueAsNumber: true,
                    })}
                    placeholder='0'
                    className='w-full'
                />
            </div>

            {/* Preview Section */}
            {isRoot && (
                <div className='mt-6 p-4 bg-gray-50 rounded-lg border'>
                    <h4 className='text-sm font-semibold mb-3 text-gray-700'>
                        Preview
                    </h4>
                    <div className='space-y-2'>
                        {watchedValues?.topic && (
                            <h3 className='font-bold text-lg text-gray-900'>
                                {watchedValues.topic}
                            </h3>
                        )}
                        {watchedValues?.content && (
                            <p className='text-gray-800 leading-relaxed'>
                                {watchedValues.content}
                            </p>
                        )}
                        {watchedValues?.bibleReferences && (
                            <div className='mt-3'>
                                <p className='text-sm text-gray-600 italic'>
                                    {watchedValues.bibleReferences
                                        .split(';')
                                        .map((ref: string) => ref.trim())
                                        .filter((ref: string) => ref)
                                        .join('; ')}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className='pl-4 border-l-2 border-dashed'>
                {isRoot && (
                    <h4 className='text-sm font-semibold mb-2'>
                        Sub-Statements
                    </h4>
                )}
                {fields.map((field, index) => (
                    <div key={field.id} className='mb-4'>
                        <StatementNodeForm
                            control={control}
                            register={register}
                            path={`${path}.subStatements.${index}`}
                            onRemove={() => remove(index)}
                        />
                    </div>
                ))}
                {isRoot && (
                    <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        onClick={addSubStatement}>
                        <PlusCircle className='mr-2 h-4 w-4' />
                        Add Sub-Statement
                    </Button>
                )}
            </div>
        </div>
    );
}
