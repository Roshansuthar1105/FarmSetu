import React from 'react'
import govData from "../data/governmentSchema.json"
import { useTranslation } from 'react-i18next';

function GovernmentSchemes() {
    const { t } = useTranslation();

    return (
        <>
            <div className='bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950 mx-auto w-full min-h-screen min-w-full text-white pt-20 pb-8' >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className='text-white text-4xl font-bold my-8 relative inline-block pb-4'>
                            <span className="relative z-10">{t('government_schemes')}</span>
                            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></span>
                        </h2>
                        <p className="mt-2 text-lg text-gray-300 max-w-3xl mx-auto mb-10">
                            {t('government_schemes_description') || 'Explore government initiatives designed to support farmers and agricultural development.'}
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {govData.map((scheme, index) => (
                            <div key={index} className='bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-500 flex flex-col h-full'>
                                <div className="flex items-center mb-4">
                                    <div className="p-2 rounded-full bg-blue-500 bg-opacity-20 mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <h3 className='text-2xl font-bold text-white'>{scheme.schemeName}</h3>
                                </div>

                                <p className="text-gray-300 mb-4">{scheme.description}</p>

                                <div className="space-y-4 flex-grow">
                                    <div>
                                        <h4 className='text-blue-400 font-semibold mb-2 flex items-center'>
                                            <span className="mr-2">👨‍👩‍👧‍👦</span> {t('beneficiaries')}
                                        </h4>
                                        <p className="text-gray-300 ml-7">{scheme.beneficiaries}</p>
                                    </div>

                                    <div>
                                        <h4 className='text-blue-400 font-semibold mb-2 flex items-center'>
                                            <span className="mr-2">🌟</span> {t('key_features')}
                                        </h4>
                                        <ul className="space-y-1 ml-7">
                                            {scheme.keyFeatures.map((feature, featureIndex) => (
                                                <li key={featureIndex} className='list-disc ml-4 text-gray-300'>{feature}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className='text-blue-400 font-semibold mb-2 flex items-center'>
                                            <span className="mr-2">✅</span> {t('eligibility')}
                                        </h4>
                                        <p className="text-gray-300 ml-7">{scheme.eligibility}</p>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-700 text-center">
                                    <a
                                        href={scheme.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300'
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        {t('visit_website')}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default GovernmentSchemes