import React from 'react'
import govData from "../data/governmentSchema.json"

function GovernmentSchemes() {
    
    return (
        <>
            <div className='bg-gray-800 mx-auto w-full min-h-screen min-w-full text-white pt-20 pb-2' >
                <h2 className='text-green-700 text-4xl text-center font-semibold w-full my-4' >Government Schemes</h2>
                {govData.map((scheme, index) => (
                    <div key={index} className='bg-gray-700 p-4 rounded-lg m-2 sm:mx-2 md:mx-24'>
                        <h3 className='text-2xl font-semibold'>{scheme.schemeName}</h3>
                        <p>{scheme.description}</p>
                        <p><strong className='text-green-400' >Beneficiaries:</strong> {scheme.beneficiaries}</p>
                        <p><strong className='text-green-400' >Key Features:</strong></p>
                        <ul>
                            {scheme.keyFeatures.map((feature, featureIndex) => (
                                <li key={featureIndex} className='list-disc ml-4'>{feature}</li>
                            ))}
                        </ul>
                        <p><strong className='text-green-400' >Eligibility:</strong> {scheme.eligibility}</p>
                        <a href={scheme.website} target="_blank" rel="noopener noreferrer" className='text-blue-500 hover:text-blue-300 hover:underline'>Visit Website</a>
                    </div>
                ))}
            </div>
        </>
    )
}

export default GovernmentSchemes