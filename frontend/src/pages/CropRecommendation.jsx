import React, { useState } from 'react'
import cropData from '../data/cropData.json'
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
function CropRecommendation() {
    const { t } = useTranslation();
    const [text, setText] = useState('jaipur');
    const [data, setData] = useState({
        additional_notes: "Moderate water resources, suitable for Rabi crops.",
        average_rainfall: 650,
        average_temperature: 25.1,
        city_name: "Jaipur",
        climate_type: "Semi-arid",
        recommended_crops: "Wheat, Mustard, Barley, Pulses",
        recommended_trees: "Neem, Peepal, Khejri, Amla",
        soil_type: "Sandy loam",
        state: "Rajasthan",
        suitable_season: "Rabi",
        water_availability: "Medium"
    })
    const handleSubmit = () => {
        const cityname = text.trim().toLocaleLowerCase()
        const obj = cropData.filter((data) => {
            if (data.city_name.toLocaleLowerCase() === cityname) return true;
        })
        if (obj.length === 1) {
            setData(obj[0]);
            setText('');
            toast.success(t('data_updated_successfully'))
        } else {
            toast.error(t('invalid_city'));
        }
    }
    return (
        <div className='min-h-screen min-w-full bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950 py-24 px-4 flex flex-col gap-4' >
            <div className="max-w-7xl mx-auto w-full">
                <div className="text-center mb-10">
                    <h2 className='text-4xl text-white font-bold relative inline-block pb-4'>
                        <span className="relative z-10">{t('crop_recommendation')}</span>
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-teal-500"></span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
                        {t('crop_recommendation_description') || 'Get personalized crop recommendations based on your location and local environmental conditions.'}
                    </p>
                </div>

                <div className='flex flex-col sm:flex-row gap-3 w-full max-w-3xl mx-auto my-8 bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700'>
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            list='city_input'
                            placeholder={t('enter_city_name')}
                            value={text}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }}
                            onChange={(e) => setText(e.target.value)}
                            className='pl-10 pr-4 py-3 w-full bg-gray-700 text-white text-lg rounded-lg border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-30 focus:outline-none placeholder:text-gray-400 transition-all duration-300'
                        />
                        <datalist id="city_input">
                            {cropData.map((city) => (
                                <option key={city.city_name} value={city.city_name}>{city.city_name}</option>
                            ))}
                        </datalist>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className='px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-lg font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center min-w-[140px]'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        {t('get_data')}
                    </button>
                </div>

                <div className='max-w-5xl w-full mx-auto rounded-xl overflow-hidden shadow-2xl border border-gray-700 bg-gray-800'>
                    <div className='bg-gradient-to-r from-green-700 to-green-800 py-4 px-6'>
                        <h3 className='text-xl text-white font-bold flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {t('recommended_data_for')} <span className='text-green-300 ml-2'>{data.city_name}</span>
                        </h3>
                    </div>

                    <div className='p-6'>
                        <div className='grid md:grid-cols-2 gap-6'>
                            <div className='bg-gray-700 rounded-lg shadow-inner p-5 border border-gray-600'>
                                <h4 className='text-lg font-semibold text-green-400 mb-4 border-b border-gray-600 pb-2'>
                                    {t('location_details')}
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-start">
                                        <span className="text-gray-400 w-1/2">{t('state')}:</span>
                                        <span className="text-white font-medium">{data.state}</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="text-gray-400 w-1/2">{t('climate_type')}:</span>
                                        <span className="text-white font-medium">{data.climate_type}</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="text-gray-400 w-1/2">{t('soil_type')}:</span>
                                        <span className="text-white font-medium">{data.soil_type}</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="text-gray-400 w-1/2">{t('average_rainfall')}:</span>
                                        <span className="text-white font-medium">{data.average_rainfall} mm</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="text-gray-400 w-1/2">{t('average_temperature')}:</span>
                                        <span className="text-white font-medium">{data.average_temperature}°C</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="text-gray-400 w-1/2">{t('suitable_season')}:</span>
                                        <span className="text-white font-medium">{data.suitable_season}</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="text-gray-400 w-1/2">{t('water_availability')}:</span>
                                        <span className="text-white font-medium">{data.water_availability}</span>
                                    </div>
                                </div>
                            </div>

                            <div className='bg-gray-700 rounded-lg shadow-inner p-5 border border-gray-600'>
                                <h4 className='text-lg font-semibold text-green-400 mb-4 border-b border-gray-600 pb-2'>
                                    {t('recommendations')}
                                </h4>
                                <div className="space-y-4">
                                    <div>
                                        <h5 className="text-gray-300 font-medium mb-2 flex items-center">
                                            <span className="mr-2">🌾</span> {t('recommended_crops')}:
                                        </h5>
                                        <p className="text-white ml-7 bg-gray-600 bg-opacity-50 p-3 rounded-lg">
                                            {data.recommended_crops}
                                        </p>
                                    </div>

                                    <div>
                                        <h5 className="text-gray-300 font-medium mb-2 flex items-center">
                                            <span className="mr-2">🌳</span> {t('recommended_trees')}:
                                        </h5>
                                        <p className="text-white ml-7 bg-gray-600 bg-opacity-50 p-3 rounded-lg">
                                            {data.recommended_trees}
                                        </p>
                                    </div>

                                    <div>
                                        <h5 className="text-gray-300 font-medium mb-2 flex items-center">
                                            <span className="mr-2">📝</span> {t('additional_notes')}:
                                        </h5>
                                        <p className="text-white ml-7 bg-gray-600 bg-opacity-50 p-3 rounded-lg">
                                            {data.additional_notes}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CropRecommendation