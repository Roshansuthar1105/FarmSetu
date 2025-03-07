import React from 'react';
import { Button } from '@nextui-org/react';
import { Typewriter } from 'react-simple-typewriter';
import { Link } from 'react-router-dom'; // Import this if you're using react-router
import { useTranslation } from 'react-i18next';
function Hero() {
    const {t} = useTranslation(); 
    return (
        <section className="hero bg-gradient-to-r from-green-700 via-green-800 to-green-900 text-white h-screen flex items-center justify-center relative overflow-hidden">
            <div className="text-center z-10">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in">
                    {t('heroTitle')}{' '}
                    <span>
                        <Typewriter
                            words={t('heroSubtitles', { returnObjects: true })}
                            loop={true}
                            cursor
                            cursorStyle='|'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    </span>
                    
                </h1>
                <p className="text-lg md:text-2xl mb-6 animate-fade-in animation-delay-1">
                    {t('heroDescription')}
                </p>
                <div className="flex flex-col items-center space-y-4 mt-8">
                    <Link to="https://crop-mitra.onrender.com" target='_blank'>
                    {/* <Link to="/form"> */}
                        <Button
                            color="primary"
                            size="lg"
                            className="bg-green-400 text-black font-bold hover:bg-green-500 text-xl py-4 px-8 animate-bounce"
                        >
                            {t('freeVirtualSoilCheck')}
                        </Button>
                    </Link>
                    <div className="flex space-x-4 mt-6">
                        <Link to="/resources">
                            <Button
                                color="primary"
                                size="lg"
                                className="bg-green-400 text-black font-bold hover:bg-green-500 text-lg py-3 px-6"
                            >
                                {t('resources')}
                            </Button>
                        </Link>
                        <Link to="/community">
                            <Button
                                color="primary"
                                size="lg"
                                className="bg-green-400 text-black font-bold hover:bg-green-500 text-lg py-3 px-6"
                            >
                                {t('community')}
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="mt-4 text-sm md:text-lg animate-fade-in animation-delay-3">
                    {t('joinThousands')}
                </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-green-800 to-green-900 opacity-60 z-0"></div>
            <div className="absolute bottom-0 left-0 w-full flex justify-center mb-4 z-10">
                <p className="text-sm md:text-lg animate-fade-in animation-delay-4">
                    {t('makingAgricultureSmarter')}
                </p>
            </div>
        </section>
    );
}

export default Hero;
