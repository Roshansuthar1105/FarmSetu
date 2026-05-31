// components/admin/EmailPreview.jsx
import React, { useRef, useEffect } from 'react';
import { FaEye, FaCode, FaDesktop, FaTimes } from 'react-icons/fa';

const EmailPreview = ({ subject, content, contentType, onClose }) => {
    const [viewMode, setViewMode] = React.useState('preview'); // 'preview', 'html', 'mobile'
    const modalRef = useRef(null);
    const closeButtonRef = useRef(null);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if click is outside the modal content and not on the close button
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        // Handle escape key press
        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        // Add event listeners
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscKey);

        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';

        // Cleanup
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    const getPreviewContent = () => {
        if (contentType === 'html') {
            return content;
        }
        // Convert plain text to HTML
        return `<div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;">
            <pre style="white-space: pre-wrap; font-family: inherit;">${content}</pre>
        </div>`;
    };

    const getMobilePreview = () => {
        return `
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body { margin: 0; padding: 0; }
                .email-container { max-width: 100%; overflow-x: auto; }
                img { max-width: 100%; height: auto; }
                table { max-width: 100%; }
            </style>
            ${getPreviewContent()}
        `;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center max-w-screen-md mx-auto p-4 animate-fade-in">
            {/* Modal Content */}
            <div 
                ref={modalRef}
                className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col transform transition-all duration-300 animate-slide-up"
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <div>
                        <h2 className="text-xl font-bold text-white">Email Preview</h2>
                        <p className="text-sm text-gray-400 mt-1">Subject: {subject}</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode('preview')}
                            className={`px-3 py-1 rounded-md transition ${
                                viewMode === 'preview' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                            title="Desktop Preview"
                        >
                            <FaDesktop className="inline mr-1" /> Desktop
                        </button>
                        <button
                            onClick={() => setViewMode('mobile')}
                            className={`px-3 py-1 rounded-md transition ${
                                viewMode === 'mobile' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                            title="Mobile Preview"
                        >
                            <FaEye className="inline mr-1" /> Mobile
                        </button>
                        <button
                            onClick={() => setViewMode('html')}
                            className={`px-3 py-1 rounded-md transition ${
                                viewMode === 'html' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                            title="HTML Source"
                        >
                            <FaCode className="inline mr-1" /> HTML
                        </button>
                        <button
                            ref={closeButtonRef}
                            onClick={onClose}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md transition-colors flex items-center gap-2"
                            title="Close (Esc)"
                        >
                            <FaTimes /> Close
                        </button>
                    </div>
                </div>

                {/* Preview Area */}
                <div className="flex-1 overflow-auto p-4 bg-gray-800">
                    {viewMode === 'html' && (
                        <div className="bg-gray-900 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-700">
                                <span className="text-green-400 text-sm font-mono">HTML Source Code</span>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(getPreviewContent());
                                        // You can add a toast notification here
                                    }}
                                    className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
                                >
                                    Copy HTML
                                </button>
                            </div>
                            <pre className="text-green-400 text-sm overflow-x-auto">
                                <code>{getPreviewContent()}</code>
                            </pre>
                        </div>
                    )}

                    {viewMode === 'mobile' && (
                        <div className="flex justify-center">
                            <div className="w-[375px] bg-white rounded-lg shadow-xl overflow-hidden">
                                <div className="bg-gray-800 p-2 text-center text-white text-xs">
                                    Mobile Preview (375px)
                                </div>
                                <iframe
                                    srcDoc={getMobilePreview()}
                                    title="Mobile Email Preview"
                                    className="w-full h-[600px] border-0"
                                    sandbox="allow-same-origin allow-scripts"
                                />
                            </div>
                        </div>
                    )}

                    {viewMode === 'preview' && (
                        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                            <div className="bg-gray-800 p-2 text-center text-white text-xs flex justify-between items-center">
                                <span>Desktop Preview</span>
                                <span className="text-gray-400 text-xs">Scale: 100%</span>
                            </div>
                            <iframe
                                srcDoc={getPreviewContent()}
                                title="Email Preview"
                                className="w-full h-[600px] border-0"
                                sandbox="allow-same-origin allow-scripts"
                            />
                        </div>
                    )}
                </div>

                {/* Footer with info */}
                <div className="p-4 border-t border-gray-700 bg-gray-800">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-400">
                        <div className="flex items-center gap-4">
                            <span>⚠️ This is a preview. Actual email may vary across email clients.</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {contentType === 'html' ? (
                                <span className="text-green-400">📧 HTML Email</span>
                            ) : (
                                <span className="text-blue-400">📝 Plain Text Email</span>
                            )}
                            <span className="text-gray-500 text-xs">
                                Press ESC to close
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add animation styles */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                @keyframes slideUp {
                    from {
                        transform: translateY(50px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                
                .animate-fade-in {
                    animation: fadeIn 0.2s ease-out;
                }
                
                .animate-slide-up {
                    animation: slideUp 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default EmailPreview;