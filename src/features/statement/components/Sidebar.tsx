import React from 'react';
import { Statement } from '../types';

interface SidebarProps {
    statements: Statement[];
    selectedTopicId: string;
    onSelectTopic: (topicId: string) => void;
    onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
    statements,
    selectedTopicId,
    onSelectTopic,
    onClose,
}) => {
    // REMOVED: The flattenStatements function is no longer needed as we only want to show top-level items.

    return (
        <div className='h-full flex flex-col'>
            {/* Mobile-only header with close button */}
            <div className='md:hidden p-4 border-b border-mystic-300 flex justify-between items-center shrink-0'>
                <h2 className='text-lg font-bold text-dark-900'>Topics</h2>
                <button
                    onClick={onClose}
                    className='p-2 -mr-2 text-dark-500 hover:text-dark-800 hover:bg-mystic-100 rounded-full transition-colors'
                    aria-label='Close navigation menu'>
                    <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M6 18L18 6M6 6l12 12'
                        />
                    </svg>
                </button>
            </div>

            {/* The nav component now iterates directly over the top-level statements */}
            <nav className='overflow-y-auto p-4 md:p-0 md:sticky md:top-12'>
                <h2 className='hidden md:block text-sm font-semibold uppercase text-dark-500 tracking-wider mb-4'>
                    Statement of Faith
                </h2>
                <ul className=''>
                    {/* CHANGED: We now map over the `statements` prop directly, not the flattened list. */}
                    {statements.map(statement => (
                        <li key={statement.id}>
                            <button
                                onClick={() => onSelectTopic(statement.id)}
                                className={`w-full text-left text-sm px-3 py-1 rounded-md transition-colors duration-200 text-dark-700 ${
                                    selectedTopicId === statement.id
                                        ? 'bg-cerulean-100 text-cerulean-800 font-semibold'
                                        : 'hover:bg-mystic-100 hover:text-dark-900'
                                }`}>
                                {statement.topic}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};
