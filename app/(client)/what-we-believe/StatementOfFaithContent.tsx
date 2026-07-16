'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/src/features/statement/components/Sidebar';
import { Content } from '@/src/features/statement/components/Content';
import { Statement } from '@/src/features/statement/types';
import PageHeader from '@/src/components/PageHeader';

interface StatementOfFaithContentProps {
    statements: Statement[];
}

export default function StatementOfFaithContent({
    statements,
}: StatementOfFaithContentProps) {
    const [selectedTopic, setSelectedTopic] = useState<Statement | null>(
        statements.length > 0 ? statements[0] : null
    );
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSelectTopic = (topicId: string) => {
        const topic = statements.find(s => s.id === topicId);
        setSelectedTopic(topic || null);
        setIsSidebarOpen(false);
    };

    return (
        <div className='bg-mystic-50 py-8 min-h-screen'>
            <PageHeader
                title='Statement of Faith'
                sub={`Sound doctrine is essential for a life which pleases the Lord Jesus Christ. We believe the Statement of Faith or Doctrinal Statement which follows is an accurate statement of essential Christian doctrines. This Statement of Faith neither exhausts the doctrines of the Bible nor supersedes it in authority for faith and practice, for "All scripture is given by inspiration of God, and is profitable for doctrine…" 2 Timothy 3:16. The Bible remains our final authority.`}
            />
            <div className='container mx-auto px-4 mt-16'>
                <div className='flex flex-col md:flex-row md:space-x-8'>
                    <div className='md:hidden mb-6'>
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className='w-full flex items-center justify-between p-3 bg-white border border-mystic-300 rounded-lg text-left'>
                            <span className='font-medium text-dark-700'>
                                {selectedTopic?.topic || 'Select a topic'}
                            </span>
                            <svg
                                className={`w-5 h-5 text-dark-500 transition-transform duration-200 ${
                                    isSidebarOpen ? 'rotate-180' : ''
                                }`}
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M19 9l-7 7-7-7'
                                />
                            </svg>
                        </button>
                        {isSidebarOpen && (
                            <div className='mt-2 bg-white border border-mystic-300 rounded-lg shadow-lg max-h-60 overflow-y-auto'>
                                {statements.map(statement => (
                                    <button
                                        key={statement.id}
                                        onClick={() =>
                                            handleSelectTopic(statement.id)
                                        }
                                        className={`w-full text-left px-4 py-3 hover:bg-mystic-50 transition-colors ${
                                            selectedTopic?.id === statement.id
                                                ? 'bg-cerulean-50 text-cerulean-800 font-medium'
                                                : 'text-dark-700'
                                        }`}>
                                        {statement.topic}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <aside className='hidden md:block md:w-2/5 lg:w-1/5 mb-6 md:mb-0'>
                        <Sidebar
                            statements={statements}
                            selectedTopicId={selectedTopic?.id || ''}
                            onSelectTopic={handleSelectTopic}
                            onClose={() => {}}
                        />
                    </aside>

                    <main className='md:w-3/5 lg:w-4/5'>
                        {selectedTopic ? (
                            <Content statement={selectedTopic} />
                        ) : (
                            <div className='flex items-center justify-center py-16'>
                                <p className='text-dark-500 text-lg'>
                                    Please select a topic to view.
                                </p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
