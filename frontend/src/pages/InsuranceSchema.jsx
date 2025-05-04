import React from 'react'
import InsurenceData from "../data/InsurenceData.json"
import { useTranslation } from 'react-i18next';

function InsurenceSchema() {
    const { t } = useTranslation();
    return (
        <>
            <div className='bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950 mx-auto w-full min-h-screen min-w-full text-white pt-20 pb-8' >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className='text-white text-4xl font-bold my-8 relative inline-block pb-4'>
                            <span className="relative z-10">{t('insurance_schemes')}</span>
                            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500"></span>
                        </h2>
                        <p className="mt-2 text-lg text-gray-300 max-w-3xl mx-auto mb-10">
                            {t('insurance_schemes_description') || 'Protect your agricultural investments with these specialized insurance schemes designed for farmers.'}
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {InsurenceData.map((scheme, index) => (
                            <div key={index} className='bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-green-500 flex flex-col h-full'>
                                <div className="flex items-center mb-4">
                                    <div className="p-2 rounded-full bg-green-500 bg-opacity-20 mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <h3 className='text-2xl font-bold text-white'>{scheme.policyName}</h3>
                                </div>

                                <p className="text-gray-300 mb-4">{scheme.coverage}</p>

                                <div className="space-y-4 flex-grow">
                                    <div>
                                        <h4 className='text-green-400 font-semibold mb-2 flex items-center'>
                                            <span className="mr-2">👨‍👩‍👧‍👦</span> {t('beneficiaries')}
                                        </h4>
                                        <p className="text-gray-300 ml-7">{scheme.beneficiaries}</p>
                                    </div>

                                    <div>
                                        <h4 className='text-green-400 font-semibold mb-2 flex items-center'>
                                            <span className="mr-2">💰</span> {t('premium_rate')}
                                        </h4>
                                        <ul className="space-y-1 ml-7">
                                            {typeof scheme.premiumRate === 'string' ?
                                                <li className='list-disc ml-4 text-gray-300'>{scheme.premiumRate}</li> :
                                                Object.entries(scheme.premiumRate).map(([crop, rate], cropIndex) => (
                                                    <li key={cropIndex} className='list-disc ml-4 text-gray-300'>{crop}: <span className="font-medium text-white">{rate}</span></li>
                                                ))
                                            }
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className='text-green-400 font-semibold mb-2 flex items-center'>
                                            <span className="mr-2">✨</span> {t('features')}
                                        </h4>
                                        <ul className="space-y-1 ml-7">
                                            {scheme.features.map((feature, featureIndex) => (
                                                <li key={featureIndex} className='list-disc ml-4 text-gray-300'>{feature}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-700">
                                    <h4 className='text-green-400 font-semibold mb-2 flex items-center'>
                                        <span className="mr-2">📞</span> {t('contact_details')}
                                    </h4>
                                    <p className="text-gray-300 ml-7">{scheme.contactInfo}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default InsurenceSchema