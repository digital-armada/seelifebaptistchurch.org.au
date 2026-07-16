import React, { useState } from 'react';
import { Statement } from '../types';
import { StatementFormData } from '../schemas';
import { Modal } from './Modal';
import { StatementForm } from './StatementForm';
import { useCreateOrUpdateStatement, useDeleteStatement } from '../queries';
import { Button } from '@/src/components/ui/button';
import { toast } from 'sonner';

type FormState =
    | { mode: 'addTopic' }
    | { mode: 'editTopic'; topic: Statement }
    | { mode: 'addSection'; topicId: string }
    | { mode: 'editSection'; topicId: string; section: Statement };

// REFACTORED: `onRefresh` prop is removed.
interface DashboardProps {
    statements: Statement[];
}

// Helper to convert Prisma model to form data, ensuring a clean recursive structure.
const statementToFormData = (st: Statement): StatementFormData => ({
    id: st.id,
    topic: st.topic,
    content: st.content,
    bibleReferences: st.bibleReferences || '',
    displayOrder: st.displayOrder,
    subStatements: (st.subStatements || []).map(statementToFormData),
});

export const Dashboard: React.FC<DashboardProps> = ({ statements }) => {
    const [formState, setFormState] = useState<FormState | null>(null);

    const closeForm = () => setFormState(null);

    const createOrUpdateMutation = useCreateOrUpdateStatement();
    const deleteMutation = useDeleteStatement();

    const handleMutationSuccess = (message: string) => {
        toast.success(message);
        closeForm();
        // Invalidation is handled automatically by the mutation hook.
    };

    const handleMutationError = (error: Error, defaultMessage: string) => {
        console.error(defaultMessage, error);
        toast.error(error.message || defaultMessage);
    };

    // REFACTORED: Logic is simplified to only build the payload and call the mutation.
    const handleSaveTopic = async (dataFromForm: {
        id?: string;
        topic: string;
        content: string;
        references: string;
    }) => {
        const existingTopic =
            formState?.mode === 'editTopic' ? formState.topic : null;

        const payload: StatementFormData = {
            id: dataFromForm.id,
            topic: dataFromForm.topic,
            content: dataFromForm.content,
            bibleReferences: dataFromForm.references,
            displayOrder: existingTopic?.displayOrder ?? statements.length,
            // Preserve existing sub-statements when editing a topic
            subStatements:
                existingTopic?.subStatements?.map(statementToFormData) ?? [],
        };

        createOrUpdateMutation.mutate(payload, {
            onSuccess: () => handleMutationSuccess('Root statement saved.'),
            onError: e => handleMutationError(e, 'Failed to save statement.'),
        });
    };

    // REFACTORED: No more manual array splicing. We build the new state and let the server handle it.
    const handleSaveSection = async (
        topicId: string,
        sectionDataFromForm: {
            id?: string;
            topic: string;
            content: string;
            references: string;
        }
    ) => {
        const parentStatement = statements.find(s => s.id === topicId);
        if (!parentStatement) {
            return toast.error('Parent statement not found.');
        }

        // Deep copy the parent to avoid direct prop mutation (anti-pattern).
        const parentAsFormData = statementToFormData(parentStatement);

        const newSectionData = {
            id: sectionDataFromForm.id,
            topic: sectionDataFromForm.topic,
            content: sectionDataFromForm.content,
            bibleReferences: sectionDataFromForm.references,
            displayOrder: 0, // Server action will handle re-ordering.
            subStatements: [],
        };

        if (sectionDataFromForm.id) {
            // Editing: find and replace
            const index = parentAsFormData.subStatements.findIndex(
                s => s.id === sectionDataFromForm.id
            );
            if (index !== -1) {
                parentAsFormData.subStatements[index] = {
                    ...parentAsFormData.subStatements[index], // preserve deeper nesting if any
                    ...newSectionData,
                };
            }
        } else {
            // Adding: push to array
            newSectionData.displayOrder = parentAsFormData.subStatements.length;
            parentAsFormData.subStatements.push(newSectionData);
        }

        createOrUpdateMutation.mutate(parentAsFormData, {
            onSuccess: () => handleMutationSuccess('Sub-statement saved.'),
            onError: e =>
                handleMutationError(e, 'Failed to save sub-statement.'),
        });
    };

    // REFACTORED: The logic for deleting a topic is now much simpler.
    const handleDeleteTopic = async (topicId: string) => {
        if (
            window.confirm(
                'Are you sure you want to delete this topic and all its sections?'
            )
        ) {
            deleteMutation.mutate(topicId, {
                onSuccess: () =>
                    handleMutationSuccess('Topic deleted successfully.'),
                onError: e => handleMutationError(e, 'Failed to delete topic.'),
            });
        }
    };

    // REFACTORED: Deleting a section now also uses the robust update action.
    const handleDeleteSection = async (topicId: string, sectionId: string) => {
        if (window.confirm('Are you sure you want to delete this section?')) {
            const parentStatement = statements.find(s => s.id === topicId);
            if (!parentStatement) {
                return toast.error('Parent statement not found.');
            }

            const parentAsFormData = statementToFormData(parentStatement);
            parentAsFormData.subStatements =
                parentAsFormData.subStatements.filter(s => s.id !== sectionId);

            createOrUpdateMutation.mutate(parentAsFormData, {
                onSuccess: () =>
                    handleMutationSuccess('Sub-statement deleted.'),
                onError: e =>
                    handleMutationError(e, 'Failed to delete sub-statement.'),
            });
        }
    };

    return (
        <div className='space-y-8 w-full'>
            <div className='flex justify-between items-center'>
                {/* <h1 className='text-3xl font-bold text-dark-900'>Dashboard</h1> */}
                <Button
                    onClick={() => setFormState({ mode: 'addTopic' })}
                    className='bg-cerulean-500 hover:bg-cerulean-600'>
                    Add Statement
                </Button>
            </div>

            <div className='space-y-6'>
                {statements.map(topic => (
                    <div
                        key={topic.id}
                        className='bg-white p-6 rounded-xl shadow-md border border-mystic-200'>
                        <div className='flex justify-between items-start mb-4'>
                            <div className='pr-4'>
                                <h2 className='text-2xl font-semibold text-dark-800'>
                                    {topic.topic}
                                </h2>
                                {topic.content && (
                                    <p className='text-sm text-dark-600 mt-2 line-clamp-2'>
                                        {topic.content}
                                    </p>
                                )}
                            </div>
                            <div className='flex items-center space-x-2 shrink-0'>
                                <Button
                                    variant='outline'
                                    size='sm'
                                    onClick={() =>
                                        setFormState({
                                            mode: 'editTopic',
                                            topic,
                                        })
                                    }>
                                    Edit
                                </Button>
                                <Button
                                    variant='destructive'
                                    size='sm'
                                    onClick={() => handleDeleteTopic(topic.id)}>
                                    Delete
                                </Button>
                            </div>
                        </div>

                        <div className='space-y-4 pl-4 border-l-2 border-mystic-200'>
                            {topic.subStatements &&
                                topic.subStatements.map(section => (
                                    <div
                                        key={section.id}
                                        className='bg-mystic-50 p-4 rounded-lg'>
                                        <div className='flex justify-between items-start'>
                                            <div>
                                                <h3 className='font-bold text-dark-700'>
                                                    {section.topic}
                                                </h3>
                                                <p className='text-sm text-dark-600 mt-1 line-clamp-2'>
                                                    {section.content}
                                                </p>
                                                <p className='text-xs text-dark-500 mt-2'>
                                                    References:{' '}
                                                    {section.bibleReferences}
                                                </p>
                                            </div>
                                            <div className='flex items-center space-x-2 shrink-0 ml-4'>
                                                <Button
                                                    variant='outline'
                                                    size='sm'
                                                    onClick={() =>
                                                        setFormState({
                                                            mode: 'editSection',
                                                            topicId: topic.id,
                                                            section,
                                                        })
                                                    }>
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant='destructive'
                                                    size='sm'
                                                    onClick={() =>
                                                        handleDeleteSection(
                                                            topic.id,
                                                            section.id
                                                        )
                                                    }>
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            <Button
                                variant='ghost'
                                size='sm'
                                onClick={() =>
                                    setFormState({
                                        mode: 'addSection',
                                        topicId: topic.id,
                                    })
                                }
                                className='text-cerulean-600 hover:text-cerulean-800 mt-4'>
                                + Add Sub Statement
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {formState && (
                <Modal isOpen={!!formState} onClose={closeForm}>
                    <StatementForm
                        formState={formState}
                        onSaveTopic={handleSaveTopic}
                        onSaveSection={handleSaveSection}
                        onClose={closeForm}
                    />
                </Modal>
            )}
        </div>
    );
};
