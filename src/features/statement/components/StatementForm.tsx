import React, { useState } from 'react';
import { Statement } from '../types';

type FormState =
    | { mode: 'addTopic' }
    | { mode: 'editTopic'; topic: Statement }
    | { mode: 'addSection'; topicId: string }
    | { mode: 'editSection'; topicId: string; section: Statement };

interface StatementFormProps {
    formState: FormState;
    onSaveTopic: (topicData: {
        id?: string;
        topic: string;
        content: string;
        references: string;
    }) => void;
    onSaveSection: (
        topicId: string,
        sectionData: Omit<
            Statement,
            | 'id'
            | 'bibleReferences'
            | 'displayOrder'
            | 'createdAt'
            | 'updatedAt'
            | 'subStatements'
        > & { id?: string; references: string }
    ) => void;
    onClose: () => void;
}

export const StatementForm: React.FC<StatementFormProps> = ({
    formState,
    onSaveTopic,
    onSaveSection,
    onClose,
}) => {
    const isTopic =
        formState.mode === 'addTopic' || formState.mode === 'editTopic';
    const isEditing = formState.mode.startsWith('edit');

    const getInitialState = () => {
        if (formState.mode === 'editTopic') {
            return {
                topic: formState.topic.topic,
                content: formState.topic.content,
                references: formState.topic.bibleReferences || '',
            };
        }
        if (formState.mode === 'editSection') {
            return {
                topic: formState.section.topic,
                content: formState.section.content,
                references: formState.section.bibleReferences || '',
            };
        }
        return { topic: '', content: '', references: '' };
    };

    const [formData, setFormData] = useState(getInitialState());

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formState.mode === 'addTopic') {
            onSaveTopic({ ...formData });
        } else if (formState.mode === 'editTopic') {
            onSaveTopic({ id: formState.topic.id, ...formData });
        } else if (formState.mode === 'addSection') {
            onSaveSection(formState.topicId, formData);
        } else if (formState.mode === 'editSection') {
            onSaveSection(formState.topicId, {
                id: formState.section.id,
                ...formData,
            });
        }
        onClose();
    };

    const formTitle = `${isEditing ? 'Edit' : 'Add'} ${
        isTopic ? 'Root Statement' : 'Sub Statement'
    }`;

    return (
        <form onSubmit={handleSubmit}>
            <div className='p-6'>
                <h2
                    id='modal-title'
                    className='text-xl font-bold text-dark-900'>
                    {formTitle}
                </h2>
                <div className='space-y-4 mt-4'>
                    <div>
                        <label
                            htmlFor='topic'
                            className='block text-sm font-medium text-dark-700'>
                            Topic
                        </label>
                        <input
                            type='text'
                            name='topic'
                            id='topic'
                            value={formData.topic}
                            onChange={handleChange}
                            className='mt-1 block w-full px-3 py-2 bg-white border border-mystic-300 rounded-md shadow-sm focus:outline-none focus:ring-cerulean-500 focus:border-cerulean-500'
                            placeholder={
                                isTopic
                                    ? 'e.g. Of Salvation'
                                    : 'e.g. The Authority of God'
                            }
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='content'
                            className='block text-sm font-medium text-dark-700'>
                            Content
                        </label>
                        <textarea
                            name='content'
                            id='content'
                            rows={4}
                            value={formData.content}
                            onChange={handleChange}
                            className='mt-1 block w-full px-3 py-2 bg-white border border-mystic-300 rounded-md shadow-sm focus:outline-none focus:ring-cerulean-500 focus:border-cerulean-500'
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='references'
                            className='block text-sm font-medium text-dark-700'>
                            Bible References
                        </label>
                        <input
                            type='text'
                            name='references'
                            id='references'
                            value={formData.references}
                            onChange={handleChange}
                            className='mt-1 block w-full px-3 py-2 bg-white border border-mystic-300 rounded-md shadow-sm focus:outline-none focus:ring-cerulean-500 focus:border-cerulean-500'
                            placeholder='e.g. John 3:16; Romans 8:28'
                        />
                        <p className='mt-1 text-xs text-dark-500'>
                            Enter references separated by semi-colons.
                        </p>
                    </div>
                </div>
            </div>
            <div className='bg-mystic-50 px-6 py-3 flex justify-end space-x-3 rounded-b-xl'>
                <button
                    type='button'
                    onClick={onClose}
                    className='px-4 py-2 bg-white text-dark-700 font-semibold rounded-lg border border-mystic-300 hover:bg-mystic-100 transition-colors'>
                    Cancel
                </button>
                <button
                    type='submit'
                    className='px-4 py-2 bg-cerulean-500 text-white font-semibold rounded-lg hover:bg-cerulean-600 transition-colors shadow-sm'>
                    Save
                </button>
            </div>
        </form>
    );
};
