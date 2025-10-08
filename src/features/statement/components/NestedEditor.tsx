import { Statement } from '../schemas';

interface NestedEditorProps {
    statement: Statement;
}

// A recursive component to render a statement and its children
const StatementNode = ({ statement }: { statement: Statement }) => {
    return (
        <div className='ml-6 pl-4 border-l-2 border-gray-200'>
            <h4 className='font-semibold text-lg'>{statement.topic}</h4>
            <p className='text-gray-700 mt-1'>{statement.content}</p>
            {statement.bibleReferences && (
                <p className='text-sm text-gray-500 mt-1 italic'>
                    {statement.bibleReferences}
                </p>
            )}
            {statement.subStatements && statement.subStatements.length > 0 && (
                <div className='mt-4 space-y-4'>
                    {statement.subStatements.map(sub => (
                        <StatementNode key={sub.id} statement={sub} />
                    ))}
                </div>
            )}
        </div>
    );
};

export const NestedEditor = ({ statement }: NestedEditorProps) => {
    return (
        <div className='space-y-4'>
            {/* Render the root node */}
            <div>
                <h3 className='font-bold text-xl'>{statement.topic}</h3>
                <p className='text-gray-800 mt-2'>{statement.content}</p>
                {statement.bibleReferences && (
                    <p className='text-sm text-gray-600 mt-2 italic'>
                        {statement.bibleReferences}
                    </p>
                )}
            </div>

            {/* Render children if they exist */}
            {statement.subStatements && statement.subStatements.length > 0 && (
                <div className='mt-6 space-y-4'>
                    {statement.subStatements.map(subStatement => (
                        <StatementNode
                            key={subStatement.id}
                            statement={subStatement}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
