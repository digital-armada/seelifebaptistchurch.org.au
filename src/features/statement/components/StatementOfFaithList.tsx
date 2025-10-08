'use client';

import { useState } from 'react';
import { useStatements } from '../queries';
import { Statement } from '../types';

function BibleReferenceBadge({ reference }: { reference: string }) {
    return (
        <span className='inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full border border-blue-200 hover:bg-blue-200 cursor-pointer transition-colors mr-1 mb-1'>
            {reference}
        </span>
    );
}

function StatementNavigation({
    statements,
    selectedId,
    onSelect,
}: {
    statements: Statement[];
    selectedId: string;
    onSelect: (id: string) => void;
}) {
    const flattenStatements = (statements: Statement[]): Statement[] => {
        const result: Statement[] = [];
        statements.forEach(statement => {
            result.push(statement);
            if (statement.subStatements) {
                result.push(...flattenStatements(statement.subStatements));
            }
        });
        return result;
    };

    const allStatements = flattenStatements(statements);

    return (
        <div className='bg-white rounded-lg shadow-sm border p-4 h-fit'>
            <h3 className='font-semibold text-gray-900 mb-3'>
                Statement of Faith
            </h3>
            <nav className='space-y-1 max-h-96 overflow-y-auto'>
                {allStatements.map(statement => (
                    <button
                        key={statement.id}
                        onClick={() => onSelect(statement.id)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                            selectedId === statement.id
                                ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}>
                        {statement.topic}
                    </button>
                ))}
            </nav>
        </div>
    );
}

function StatementContent({ statement }: { statement: Statement }) {
    const extractBibleReferences = (content: string): string[] => {
        const matches = content.match(/([1-3]\s*[A-Za-z]+)\s*(\d+):?(\d*)/g);
        return matches || [];
    };

    const renderContentWithReferences = (content: string) => {
        const references = extractBibleReferences(content);
        let processedContent = content;

        // Replace common Bible reference patterns with badge placeholders
        references.forEach(ref => {
            const badge = `<bible-ref>${ref}</bible-ref>`;
            processedContent = processedContent.replace(ref, badge);
        });

        const parts = processedContent.split('<bible-ref>');

        return parts.map((part, index) => {
            if (index === 0) return part;
            const ref = references[index - 1];
            return (
                <span key={index}>
                    <BibleReferenceBadge reference={ref} />
                    {part}
                </span>
            );
        });
    };

    return (
        <div className='bg-white rounded-lg shadow-sm border p-6'>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                {statement.topic}
            </h2>
            <div className='prose prose-gray max-w-none'>
                <div className='text-gray-700 leading-relaxed mb-4'>
                    {renderContentWithReferences(statement.content)}
                </div>

                {statement.bibleReferences && (
                    <div className='mt-4'>
                        <h4 className='text-sm font-semibold text-gray-600 mb-2'>
                            Additional References:
                        </h4>
                        <div className='flex flex-wrap gap-1'>
                            {statement.bibleReferences
                                .split(',')
                                .map((ref, index) => (
                                    <BibleReferenceBadge
                                        key={index}
                                        reference={ref.trim()}
                                    />
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function StatementItem({ statement }: { statement: Statement }) {
    return (
        <div className='mb-4'>
            <StatementContent statement={statement} />
            {statement.subStatements && statement.subStatements.length > 0 && (
                <div className='ml-6 mt-4 space-y-4'>
                    {statement.subStatements.map(sub => (
                        <StatementItem key={sub.id} statement={sub} />
                    ))}
                </div>
            )}
        </div>
    );
}

export function StatementOfFaithList() {
    const { data: statements, isLoading, error } = useStatements();
    const [selectedId, setSelectedId] = useState<string>('');

    if (isLoading)
        return (
            <div className='flex items-center justify-center min-h-64'>
                <div className='text-gray-500'>Loading...</div>
            </div>
        );

    if (error)
        return (
            <div className='flex items-center justify-center min-h-64'>
                <div className='text-red-500'>Error: {error.message}</div>
            </div>
        );

    const statementsArray = (statements as any) || [];

    // Set default selected statement
    if (!selectedId && statementsArray.length > 0) {
        const firstStatement = statementsArray[0];
        if (firstStatement && !firstStatement.subStatements?.length) {
            setSelectedId(firstStatement.id);
        }
    }

    const flattenStatements = (statements: Statement[]): Statement[] => {
        const result: Statement[] = [];
        statements.forEach(statement => {
            result.push(statement);
            if (statement.subStatements) {
                result.push(...flattenStatements(statement.subStatements));
            }
        });
        return result;
    };

    const allStatements = flattenStatements(statementsArray);
    const selectedStatement =
        allStatements.find(s => s.id === selectedId) || allStatements[0];

    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* Navigation Sidebar */}
            <div className='lg:col-span-1'>
                <StatementNavigation
                    statements={statementsArray}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                />
            </div>

            {/* Content Area */}
            <div className='lg:col-span-2'>
                {selectedStatement ? (
                    <StatementContent statement={selectedStatement} />
                ) : (
                    <div className='bg-white rounded-lg shadow-sm border p-6'>
                        <div className='text-gray-500 text-center'>
                            Select a statement from the navigation to view its
                            content.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
