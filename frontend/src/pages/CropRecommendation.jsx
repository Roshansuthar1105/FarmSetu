import React, { useState } from 'react'
import cropData from '../data/cropData.json'
import toast from 'react-hot-toast';
function CropRecommendation() {
    const [text, setText] = useState('jaipur');
    const [data, setData] = useState({
        additional_notes:"Moderate water resources, suitable for Rabi crops.",
        average_rainfall:650,
        average_temperature:25.1,
        city_name:"Jaipur",
        climate_type:"Semi-arid",
        recommended_crops:"Wheat, Mustard, Barley, Pulses",
        recommended_trees:"Neem, Peepal, Khejri, Amla",
        soil_type:"Sandy loam",
        state:"Rajasthan",
        suitable_season:"Rabi",
        water_availability:"Medium"
    })
    const handleSubmit = () => {
        const cityname = text.trim().toLocaleLowerCase()
        const obj = cropData.filter((data) => {
            if (data.city_name.toLocaleLowerCase() === cityname) return true;
        })
        if(obj.length===1){
            setData(obj[0]);
            setText('');
            toast.success("Data Updated Successfully")
        }else{
            toast.error("Invalid city");
        }
    }
    return (
        <div className='min-h-screen min-w-full bg-gray-800 py-24 px-4 flex flex-col gap-4' >
            <h2 className='text-4xl text-white font-bold text-center' >Crop Recommendation</h2>
            <div className='flex gap-2 flex-row w-full max-w-[1200px] mx-auto my-4' >
                <input type="text" list='city_input' placeholder='Enter City Name' value={text} onKeyDown={(e)=>{if(e.key==='Enter')handleSubmit()}} onChange={(e) => setText(e.target.value)} className='px-4 py-2 w-full border-2 bg-gray-600 text-white text-lg rounded-md border-green-300 selection:border-blue-300 placeholder:text-gray-300 ' />
                <datalist id="city_input">
                    {cropData.map((city) => (
                        <option key={city.city_name} value={city.city_name}>{city.city_name}</option>
                    ))}
                </datalist>
                <button onClick={handleSubmit} className='px-4 py-2 bg-green-600 text-white text-lg rounded-md border border-green-300 w-80 selection:border-blue-300 placeholder:text-gray-300 ' >Get Data</button>
            </div>
            <div className='max-w-[1200px] w-screen bg-green-700 mx-auto min-h-[65dvh] p-3 rounded-lg text-white' >
                <div className='flex flex-row gap-4 flex-wrap sm:flex-nowrap '>
                    <div className='p-4 bg-green-600 w-full rounded-lg shadow-md text-white'>
                        <h3 className='text-xl  font-bold text-gray-800'>City Name: {data.city_name}</h3>
                        <p>State: {data.state}</p>
                        <p>Climate Type: {data.climate_type}</p>
                        <p>Soil Type: {data.soil_type}</p>
                        <p>Average Rainfall: {data.average_rainfall}</p>
                        <p>Average Temperature: {data.average_temperature}</p>
                        <p>Suitable Season: {data.suitable_season}</p>
                        <p>Water Availability: {data.water_availability}</p>
                    </div>
                    <div className='p-4 bg-green-600 w-full rounded-lg shadow-md'>
                        <h3 className='text-xl font-bold text-gray-800'>Recommended Crops: {data.recommended_crops}</h3>
                        <p>Recommended Trees: {data.recommended_trees}</p>
                        <p>Additional Notes: {data.additional_notes}</p>
                    </div>
                </div>
                {/* <div className='flex justify-end mt-4'>
                <button className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700'>
                    <BiEdit size={20} className='mr-2' />
                    Edit
                </button>
            </div> */}
            </div>
        </div>
    )
}

export default CropRecommendation