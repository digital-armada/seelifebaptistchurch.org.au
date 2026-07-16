import React from 'react';

interface ScripturePillProps {
    reference: string;
}

export const ScripturePill: React.FC<ScripturePillProps> = ({ reference }) => {
    return (
        <span className='inline-block bg-cerulean-500 text-white text-xs font-medium px-3 py-1.5 rounded-full cursor-pointer hover:bg-cerulean-600 transition-colors duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5'>
            {reference}
        </span>
    );
};
