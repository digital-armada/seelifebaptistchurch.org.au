import React, { useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div
            className='fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4'
            aria-labelledby='modal-title'
            role='dialog'
            aria-modal='true'>
            <div
                className='fixed inset-0'
                onClick={onClose}
                aria-hidden='true'></div>
            <div className='bg-white rounded-xl shadow-2xl w-full max-w-lg z-10 transform transition-all'>
                {children}
            </div>
        </div>
    );
};
