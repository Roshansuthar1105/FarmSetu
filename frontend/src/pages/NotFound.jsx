import { useTranslation } from "react-i18next";

const NotFound = () => {
    const { t } = useTranslation();
    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
                <h1 className="text-6xl font-bold text-gray-100 mb-4">404</h1>
                <h2 className="text-2xl text-gray-200 mb-8">{t('page_not_found')}</h2>
                <p className="text-gray-400 mb-8">{t('not_found_message')}</p>
                <a href="/" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    {t('return_home')}
                </a>
            </div>
        </div>
    );
}

export default NotFound;