import { useTranslation } from "react-i18next";

const About = () => {
    const { t } = useTranslation();
    return (
        <div className="bg-gray-800 min-h-screen">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-green-600 text-center mb-12">{t('about_farmsetu')}</h1>
                
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-100">{t('our_mission')}</h2>
                        <p className="text-gray-300">
                            {t('mission_description')}
                        </p>
                        
                        <h2 className="text-2xl font-semibold text-gray-200">{t('what_we_do')}</h2>
                        <p className="text-gray-300">
                            {t('what_we_do_description')}
                        </p>
                    </div>
                    
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-200">{t('our_values')}</h2>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                                <span>{t('value_sustainability')}</span>
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                                <span>{t('value_innovation')}</span>
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                                <span>{t('value_quality')}</span>
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                                <span>{t('value_farmer_centric')}</span>
                            </li>
                        </ul>
                        
                        <h2 className="text-2xl font-semibold text-gray-200">{t('our_impact')}</h2>
                            <p className="text-gray-300">
                            {t('impact_description')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
