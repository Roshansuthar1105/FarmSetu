import React, { useState } from 'react'
import { IoLanguage } from 'react-icons/io5';
// import i18n from "./i18.js"
import i18n from "../i18.js"
function LanguageButton() {
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
    };
    const [languageSwitch, setLanguageSwitch] = useState(false);
    const lang = [
        { name: "English (Default) ", value: "en", img: "" },
        { name: "Assamese (অসমীয়া)", value: "as", img: "" },
        { name: "Bengali (বাংলা)", value: "bn", img: "" },
        { name: "Dogri (डोगरी)", value: "doi", img: "" },
        { name: "Gujarati (ગુજરાતી)", value: "gu", img: "" },
        { name: "Hindi (हिन्दी)", value: "hi", img: "" },
        { name: "Kannada (ಕನ್ನಡ)", value: "kn", img: "" },
        { name: "Kashmiri (कश्मीरी)", value: "ks", img: "" },
        { name: "Maithili (मैथिली)", value: "mai", img: "" },
        { name: "Malayalam (മലയാളം)", value: "ml", img: "" },
        { name: "Marathi (मराठी)", value: "mr", img: "" },
        { name: "Odia (ଓଡ଼ିଆ)", value: "or", img: "" },
        { name: "Punjabi (ਪੰਜਾਬੀ)", value: "pa", img: "" },
        { name: "Tamil (தமிழ்)", value: "ta", img: "" },
        { name: "Telugu (తెలుగు)", value: "te", img: "" },
        { name: "Urdu (اردو)", value: "ur", img: "" },
        // { name: "Manipuri (মণিপুরী)", value: "mni", img: "" },
        // { name: "Sindhi (सिंधी)", value: "sd", img: "" },
        // { name: "Santali (संताली)", value: "sat", img: "" },

    ]
    return (
        <div className='z-50 fixed bottom-4 left-4 bg-green-500 p-2 rounded-full shadow-md'>
            <button onClick={() => setLanguageSwitch(!languageSwitch)} className={`${!languageSwitch ?"rounded-full  text-white p-2":"hidden"}`}>
                {/* <IoLanguage /> */}
                <img src="lang.png" className='size-8' alt="Language button" />
            </button>
            <select onChange={(e) => { changeLanguage(e.target.value);setLanguageSwitch(!languageSwitch) }} className={`${!languageSwitch ? "hidden" : "bg-green-500 text-white outline-none"}`}>
                {
                    lang.map((item) => {
                        return (
                            <option key={item.value} value={item.value}  >
                                {item.name} </option>
                        )
                    })
                }
            </select>
        </div>
    )
}

export default LanguageButton