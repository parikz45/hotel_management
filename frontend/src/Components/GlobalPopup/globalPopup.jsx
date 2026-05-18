import React, { useState, useEffect } from 'react';

// 1. SIMPLE EXTERNAL STATE STORE
let listeners = [];
let state = {
    isOpen: false,
    title: '',
    content: null,
    onConfirm: null,
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    type: 'info',
};

const setState = (newState) => {
    state = { ...state, ...newState };
    listeners.forEach((listener) => listener(state));
};

// THE GLOBAL TRIGGER FUNCTION 
export const openPopup = (options) => {
    setState({
        isOpen: true,
        title: options.title || '',
        content: options.content || null,
        onConfirm: options.onConfirm || null,
        confirmText: options.confirmText || 'Confirm',
        cancelText: options.cancelText || 'Cancel',
        type: options.type || 'info',
    });
};

export const closePopup = () => setState({ isOpen: false });

// 2. CONFIGURATION TYPES STYLING
const TYPE_STYLES = {
    info: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    success: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500',
    warning: 'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500',
};

// 3. THE GLOBAL POPUP COMPONENT 
// (Just drop this once in your root App.jsx component)
export const GlobalPopup = () => {
    const [popupState, setPopupState] = useState(state);

    useEffect(() => {
        listeners.push(setPopupState);
        return () => {
            listeners = listeners.filter((l) => l !== setPopupState);
        };
    }, []);

    if (!popupState.isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-sans">
            {/* Backdrop Overlay */}
            <div
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={closePopup}
            />

            {/* Popup Modal Box */}
            <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all dark:bg-slate-800 border border-slate-100 dark:border-slate-700">

                <button
                    onClick={closePopup}
                    className="absolute right-4 top-4 flex items-center justify-center
    w-9 h-9 rounded-xl
    bg-white/10 text-white
    hover:bg-white/20
    transition-all duration-200 cursor-pointer"
                >
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Header Title */}
                {popupState.title && (
                    <h3 className="text-xl font-semibold leading-6 text-slate-900 dark:text-white mb-3 pr-6">
                        {popupState.title}
                    </h3>
                )}

                {/* Main Content Body */}
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                    {typeof popupState.content === 'string' ? <p>{popupState.content}</p> : popupState.content}
                </div>

                {/* Footer Actions Button */}
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                    <button
                        type="button"
                        className="w-full cursor-pointer sm:w-auto inline-flex justify-center rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
                        onClick={closePopup}
                    >
                        {popupState.cancelText}
                    </button>

                    {popupState.onConfirm && (
                        <button
                            type="button"
                            className={`w-full cursor-pointer sm:w-auto inline-flex justify-center rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${TYPE_STYLES[popupState.type]}`}
                            onClick={() => {
                                popupState.onConfirm();
                                closePopup();
                            }}
                        >
                            {popupState.confirmText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};