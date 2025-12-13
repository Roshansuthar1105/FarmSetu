import React, { useState, useRef } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { FaUpload, FaMicroscope, FaCheckCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const DiseaseDetection = () => {
    const { t } = useTranslation();
    const { ML_BACKEND_URL } = useAuthContext();
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setResult(null); // Reset previous result
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
            setPreview(URL.createObjectURL(droppedFile));
            setResult(null);
        }
    };

    const clearSelection = () => {
        setFile(null);
        setPreview(null);
        setResult(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async () => {
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`${ML_BACKEND_URL}/api/predict/disease`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if (response.ok) {
                setResult(data);
                toast.success(t('disease_analysis_complete') || 'Analysis complete');
            } else {
                toast.error(data.error || 'Analysis failed');
            }
        } catch (error) {
            console.error(error);
            toast.error('Server error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950 min-h-screen pt-24 pb-12 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        <span className="text-red-500">{t('plant_disease')}</span> {t('detection')}
                    </h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        {t('disease_desc') || "Upload a photo of your plant leaf. Our AI will diagnose diseases and suggest immediate treatments."}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Upload Section */}
                    <div className="space-y-6">
                        <div 
                            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center h-80 transition-all ${
                                preview ? 'border-green-500 bg-gray-800' : 'border-gray-600 bg-gray-800/50 hover:bg-gray-800 hover:border-gray-500'
                            }`}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            {preview ? (
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <img src={preview} alt="Preview" className="max-h-full max-w-full rounded-lg shadow-lg object-contain" />
                                    <button 
                                        onClick={clearSelection}
                                        className="absolute -top-4 -right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-md"
                                        title="Remove Image"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            ) : (
                                <div className="pointer-events-none">
                                    <FaUpload className="text-5xl text-gray-500 mb-4 mx-auto" />
                                    <p className="text-gray-300 font-medium mb-2">{t('drag_drop_image')}</p>
                                    <p className="text-gray-500 text-sm">{t('or_click_to_browse')}</p>
                                </div>
                            )}
                            
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                onChange={handleFileChange} 
                                accept="image/*" 
                                className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${preview ? 'hidden' : ''}`}
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={!file || loading}
                            className={`w-full py-4 rounded-lg font-bold text-lg shadow-lg flex items-center justify-center transition-all ${
                                !file 
                                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-green-600 to-green-800 text-white hover:from-green-500 hover:to-green-700'
                            }`}
                        >
                            {loading ? (
                                <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"></path>
                                </svg>
                            ) : (
                                <>
                                    <FaMicroscope className="mr-2" /> {t('analyze_plant')}
                                </>
                            )}
                        </button>
                    </div>

                    {/* Results Section */}
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl flex flex-col">
                        <h2 className="text-xl font-semibold text-white mb-6 border-b border-gray-700 pb-2">
                            {t('analysis_report')}
                        </h2>

                        {!result ? (
                            <div className="flex-grow flex flex-col items-center justify-center text-gray-500 opacity-60">
                                <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                                    <FaExclamationTriangle className="text-3xl" />
                                </div>
                                <p>{t('waiting_for_upload')}</p>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-fade-in">
                                {/* Disease Name */}
                                <div className="bg-gray-700/30 p-4 rounded-lg border-l-4 border-red-500">
                                    <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">{t('detected_issue')}</p>
                                    <h3 className="text-2xl font-bold text-white">{result.disease}</h3>
                                    <div className="flex items-center mt-2">
                                        <div className="flex-1 bg-gray-700 h-2 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full rounded-full ${result.confidence > 80 ? 'bg-green-500' : 'bg-yellow-500'}`}
                                                style={{ width: `${result.confidence}%` }}
                                            ></div>
                                        </div>
                                        <span className="ml-3 text-sm font-medium text-gray-300">{result.confidence}% {t('confidence')}</span>
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div className="flex items-center space-x-2">
                                    {result.disease.toLowerCase().includes('healthy') ? (
                                        <span className="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-sm font-medium flex items-center">
                                            <FaCheckCircle className="mr-2" /> {t('healthy_plant')}
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 bg-red-900/50 text-red-400 rounded-full text-sm font-medium flex items-center">
                                            <FaExclamationTriangle className="mr-2" /> {t('disease_detected')}
                                        </span>
                                    )}
                                </div>

                                {/* Treatment */}
                                <div className="bg-blue-900/10 border border-blue-800/30 p-5 rounded-lg">
                                    <h4 className="text-blue-400 font-semibold mb-3 flex items-center">
                                        <span className="text-xl mr-2">💊</span> {t('recommended_treatment')}
                                    </h4>
                                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                                        {result.treatment}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiseaseDetection;