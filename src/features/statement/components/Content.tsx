import React from 'react';
import { Statement } from '../types';
import { ScripturePill } from './ScripturePill';

interface ContentProps {
    statement: Statement;
}

export const Content: React.FC<ContentProps> = ({ statement }) => {
    const hasTopicContent =
        statement.content ||
        (statement.bibleReferences && statement.bibleReferences.length > 0);
    const hasSections =
        statement.subStatements && statement.subStatements.length > 0;

    return (
        <article className='space-y-8 max-w-none'>
            <header>
                <h1 className='text-2xl md:text-3xl font-bold tracking-tight text-dark-900'>
                    {statement.topic}
                </h1>
            </header>

            {/* Render Topic's own content if it exists */}
            {hasTopicContent && (
                <section className='space-y-4'>
                    {statement.content && (
                        <p className='text-sm md:text-base leading-relaxed text-dark-600'>
                            {statement.content}
                        </p>
                    )}
                    {statement.bibleReferences &&
                        statement.bibleReferences.length > 0 && (
                            <div className='flex flex-wrap gap-2'>
                                {statement.bibleReferences
                                    .split(';')
                                    .map((ref, index) => (
                                        <ScripturePill
                                            key={index}
                                            reference={ref.trim()}
                                        />
                                    ))}
                            </div>
                        )}
                </section>
            )}

            {/* Render a separator if there is topic content AND sections */}
            {hasTopicContent && hasSections && (
                <hr className='border-mystic-200' />
            )}

            {/* Render Sections if they exist */}
            {hasSections ? (
                <div className='space-y-6'>
                    {statement.subStatements!.map(section => (
                        <section
                            key={section.id}
                            className='scroll-mt-24'
                            id={section.id}>
                            <h2 className='text-lg md:text-xl font-semibold mb-3 text-dark-800'>
                                {section.topic}
                            </h2>
                            <p className='text-sm md:text-base leading-relaxed text-dark-600 mb-4'>
                                {section.content}
                            </p>
                            {section.bibleReferences &&
                                section.bibleReferences.length > 0 && (
                                    <div className='flex flex-wrap gap-2'>
                                        {section.bibleReferences
                                            .split(';')
                                            .map((ref, index) => (
                                                <ScripturePill
                                                    key={index}
                                                    reference={ref.trim()}
                                                />
                                            ))}
                                    </div>
                                )}
                        </section>
                    ))}
                </div>
            ) : (
                // Only show this message if there's no topic content either
                !hasTopicContent && (
                    <p className='text-dark-500'>
                        Content for this topic is not yet available.
                    </p>
                )
            )}
        </article>
    );
};
