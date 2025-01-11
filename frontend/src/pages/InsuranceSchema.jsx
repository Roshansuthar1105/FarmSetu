import React from 'react'
import InsurenceData from "../data/InsurenceData.json"
import { useTranslation } from 'react-i18next';

function InsurenceSchema() {
    const { t } = useTranslation();
    return (
        <>
            <div className='bg-gray-800 mx-auto w-full min-h-screen min-w-full text-white pt-20 pb-2' >
                <h2 className='text-white text-4xl text-center font-semibold w-full my-4' >{t('insurance_schemes')}</h2>
                {InsurenceData.map((scheme, index) => (
                    <div key={index} className='bg-gray-700 p-4 rounded-lg m-2 sm:mx-2 md:mx-24'>
                        <h3 className='text-2xl font-semibold'>{scheme.policyName}</h3>
                        <p>{scheme.coverage}</p>
                        <p><strong className='text-green-400' >{t('beneficiaries')}:</strong> {scheme.beneficiaries}</p>
                        <p><strong className='text-green-400' >{t('premium_rate')}:</strong></p>
                        <ul>
                            {typeof scheme.premiumRate === 'string' ? 
                                <li className='list-disc ml-4'>{scheme.premiumRate}</li> :
                                Object.entries(scheme.premiumRate).map(([crop, rate], cropIndex) => (
                                    <li key={cropIndex} className='list-disc ml-4'>{crop}: {rate}</li>
                                ))
                            }
                        </ul>
                        <p><strong className='text-green-400' >{t('features')}:</strong></p>
                        <ul>
                            {scheme.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className='list-disc ml-4'>{feature}</li>
                            ))}
                        </ul>
                        <p><strong className='text-green-400' >{t('contact_info')}:</strong> {scheme.contactInfo}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default InsurenceSchema