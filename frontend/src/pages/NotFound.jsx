import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaSeedling } from "react-icons/fa";

const NotFound = () => {
    const { t } = useTranslation();
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
                <div className="max-w-lg mx-auto text-center">
                    {/* Animated 404 */}
                    <div className="relative mb-8">
                        <div className="text-8xl md:text-9xl font-bold text-gray-200 dark:text-gray-700 select-none">
                            404
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <FaSearch className="text-4xl text-green-500 opacity-50" />
                        </div>
                    </div>
                    
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                        <FaSeedling className="text-3xl text-green-600 dark:text-green-500" />
                    </div>
                    
                    {/* Message */}
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                        {t('page_not_found')}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                        {t('not_found_message')}
                    </p>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/">
                            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200 font-medium">
                                <FaHome className="text-sm" />
                                {t('return_home')}
                            </button>
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 font-medium"
                        >
                            Go Back
                        </button>
                    </div>
                    
                    {/* Help Text */}
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-8">
                        Need help? <a href="/contact" className="text-green-600 hover:text-green-700">Contact Support</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;