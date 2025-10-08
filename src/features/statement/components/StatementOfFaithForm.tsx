'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { useCreateOrUpdateStatement } from '../queries';
import {
    statementFormDataSchema,
    StatementFormData,
    Statement,
} from '../schemas';

import { Button } from '@/src/components/ui/button';
import { StatementNodeForm } from './StatementNodeForm';

interface StatementOfFaithFormProps {
    statement?: Statement;
}

const prepareDefaultValues = (statement?: Statement): StatementFormData => {
    if (!statement) {
        return {
            topic: '',
            content: '',
            bibleReferences: '',
            displayOrder: 0,
            subStatements: [],
        };
    }

    const addSubStatementsArray = (st: Statement): StatementFormData => ({
        ...st,
        bibleReferences: st.bibleReferences || '',
        subStatements: st.subStatements
            ? st.subStatements.map(addSubStatementsArray)
            : [],
    });

    return addSubStatementsArray(statement);
};

export function StatementOfFaithForm({ statement }: StatementOfFaithFormProps) {
    const router = useRouter();
    const mutation = useCreateOrUpdateStatement();
    const isEditing = !!statement;

    const {
        control,
        handleSubmit,
        register,
        formState: { isSubmitting },
    } = useForm({
        resolver: zodResolver(statementFormDataSchema as any),
        defaultValues: prepareDefaultValues(statement),
    });

    const onSubmit: SubmitHandler<StatementFormData> = async data => {
        await mutation.mutateAsync(data, {
            onSuccess: () => {
                router.push('/dashboard/statement-of-faith');
            },
            onError: error => {
                console.error('Failed to save statement:', error);
            },
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <StatementNodeForm
                control={control}
                register={register}
                path=''
                onRemove={() => {}}
                isRoot={true}
            />
            <div className='flex justify-end space-x-4'>
                <Button
                    type='button'
                    variant='outline'
                    onClick={() => router.push('/dashboard/statement-of-faith')}
                    disabled={isSubmitting}>
                    Cancel
                </Button>
                <Button type='submit' disabled={isSubmitting}>
                    {isSubmitting
                        ? isEditing
                            ? 'Updating...'
                            : 'Creating...'
                        : isEditing
                        ? 'Update Statement'
                        : 'Create Statement'}
                </Button>
            </div>
        </form>
    );
}
