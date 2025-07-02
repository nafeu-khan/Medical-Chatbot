import React, { useState, useEffect } from 'react';
import { uploadPDF, fetchUploadedPDFs } from '../services/chatbotService';
import { toast } from 'react-hot-toast';
import Loader from './Loader/Loader';

const UploadPDF = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadResult, setUploadResult] = useState(null);
    const [pdfList, setPdfList] = useState([]);
    const [isLoadingList, setIsLoadingList] = useState(false);

    const fetchPDFList = async () => {
        setIsLoadingList(true);
        try {
            const pdfs = await fetchUploadedPDFs();
            setPdfList(pdfs);
        } catch (error) {
            toast.error('Failed to load uploaded PDFs.');
        } finally {
            setIsLoadingList(false);
        }
    };

    useEffect(() => {
        fetchPDFList();
    }, []);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setUploadResult(null);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            toast.error('Please select a PDF file to upload.');
            return;
        }
        setIsUploading(true);
        setUploadResult(null);
        try {
            const result = await uploadPDF(selectedFile);
            setUploadResult(result);
            toast.success('PDF uploaded and ingested successfully!');
            fetchPDFList(); // Refresh list after upload
        } catch (error) {
            toast.error(error.message || 'Failed to upload PDF.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full">
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                </div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Upload Knowledge Base PDF</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Upload PDF documents to enhance your AI assistant's knowledge
                </p>
            </div>
            
            <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="w-full text-sm text-gray-500 dark:text-gray-400
                                 file:mr-4 file:py-2 file:px-4
                                 file:rounded-md file:border-0
                                 file:text-sm file:font-medium
                                 file:bg-blue-50 file:text-blue-700
                                 hover:file:bg-blue-100
                                 dark:file:bg-blue-900 dark:file:text-blue-200
                                 dark:hover:file:bg-blue-800"
                        disabled={isUploading}
                    />
                    {selectedFile && (
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Selected: {selectedFile.name}
                        </div>
                    )}
                </div>
                
                <button
                    onClick={handleUpload}
                    disabled={isUploading || !selectedFile}
                    className="w-full px-6 py-3 bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium rounded-lg
                             hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                    {isUploading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Uploading...
                        </div>
                    ) : (
                        'Upload PDF'
                    )}
                </button>
            </div>
            
            {isUploading && <Loader />}
            {uploadResult && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="text-green-800 dark:text-green-200 text-sm font-medium">
                        {uploadResult.message}
                    </div>
                    <div className="text-green-600 dark:text-green-400 text-xs mt-1">
                        Processed chunks: {uploadResult.chunk_count}
                    </div>
                </div>
            )}
            
            <div className="mt-8">
                <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Uploaded Documents
                </h3>
                {isLoadingList ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                ) : pdfList.length === 0 ? (
                    <div className="text-center py-8">
                        <svg className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">No documents uploaded yet</p>
                        <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Upload your first PDF to get started</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {pdfList.map(pdf => (
                            <div key={pdf.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0">
                                        <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-gray-900 dark:text-white truncate">
                                            {pdf.original_filename}
                                        </h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            Uploaded: {new Date(pdf.uploaded_at).toLocaleDateString()} at {new Date(pdf.uploaded_at).toLocaleTimeString()}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                            Processed
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadPDF; 