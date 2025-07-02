import React from 'react';
import UploadPDF from '../Components/UploadPDF';

const KnowledgeBasePage = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Knowledge Base
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Upload PDF documents to enhance the AI's knowledge base. The uploaded documents will be processed and made available for the chatbot to reference when answering questions.
                    </p>
                </div>
                
                <div className="flex justify-center">
                    <div className="w-full max-w-2xl">
                        <UploadPDF />
                    </div>
                </div>
                
                <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        How Knowledge Base Works
                    </h2>
                    <div className="space-y-4 text-gray-600 dark:text-gray-300">
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mt-0.5">
                                <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold">1</span>
                            </div>
                            <p>
                                <strong>Upload Documents:</strong> Select and upload PDF files containing medical information, research papers, or reference materials.
                            </p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mt-0.5">
                                <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold">2</span>
                            </div>
                            <p>
                                <strong>Processing:</strong> The system processes your documents, extracting and indexing the content for efficient retrieval.
                            </p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mt-0.5">
                                <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold">3</span>
                            </div>
                            <p>
                                <strong>Enhanced Responses:</strong> The chatbot can now reference your uploaded documents to provide more accurate and detailed responses.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KnowledgeBasePage;
