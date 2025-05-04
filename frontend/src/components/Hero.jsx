import React from 'react';
import { Button } from '@nextui-org/react';
import { Typewriter } from 'react-simple-typewriter';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PiPlantFill } from "react-icons/pi";
function Hero() {
    const { t } = useTranslation();

    return (
        <section className="relative h-screen overflow-hidden">
            {/* Background with overlay */}
            <div className="absolute inset-0 bg-cover bg-center" style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80')",
                filter: "brightness(0.7)"
            }}></div>

            {/* Green gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-900/70 via-green-800/60 to-green-700/50"></div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-20 left-10 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>

            {/* Content container */}
            <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Logo or icon (optional) */}
                    <div className="mb-4 sm:mb-6 inline-block">
                        <PiPlantFill className='text-green-400 w-12 h-12 sm:w-16 sm:h-16 mx-auto' />
                        {/* <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-green-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7,2C3.69,2 1,4.69 1,8C1,11.31 3.69,14 7,14C8.54,14 9.94,13.44 11,12.5C12.06,13.44 13.46,14 15,14C18.31,14 21,11.31 21,8C21,4.69 18.31,2 15,2C13.46,2 12.06,2.56 11,3.5C9.94,2.56 8.54,2 7,2M7,4A4,4 0 0,1 11,8A4,4 0 0,1 7,12A4,4 0 0,1 3,8A4,4 0 0,1 7,4M15,4A4,4 0 0,1 19,8A4,4 0 0,1 15,12A4,4 0 0,1 11,8A4,4 0 0,1 15,4M7,16C3.69,16 1,18.69 1,22H13C13,18.69 10.31,16 7,16M15,16C11.69,16 9,18.69 9,22H23C23,18.69 20.31,16 15,16Z" />
                        </svg> */}
                    </div>

                    {/* Main heading with typewriter effect */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight">
                        <span className="block">{t('heroTitle')}</span>
                        <span className="block mt-1 sm:mt-2 text-green-400">
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

                    {/* Description */}
                    <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
                        {t('heroDescription')}
                    </p>

                    {/* CTA Buttons - Stacked on mobile, side by side on larger screens */}
                    <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col items-center justify-center">
                        {/* Primary CTA */}
                        <div className="w-full max-w-xs sm:max-w-md mb-4">
                            <Link to="https://crop-mitra.onrender.com" target='_blank' className="block w-full">
                                <Button
                                    size="lg"
                                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-base sm:text-lg py-4 sm:py-6 px-6 sm:px-8 rounded-xl shadow-lg hover:shadow-green-500/20 hover:scale-105 transition-all duration-300"
                                >
                                    {t('freeVirtualSoilCheck')}
                                </Button>
                            </Link>
                        </div>

                        {/* Secondary CTAs */}
                        <div className="flex flex-row gap-4 w-full max-w-xs sm:max-w-md justify-center">
                            <Link to="/resources" className="flex-1">
                                <Button
                                    size="lg"
                                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-sm sm:text-base py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:bg-white/20 transition-all duration-300"
                                >
                                    {t('resources')}
                                </Button>
                            </Link>
                            <Link to="/community" className="flex-1">
                                <Button
                                    size="lg"
                                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-sm sm:text-base py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:bg-white/20 transition-all duration-300"
                                >
                                    {t('community')}
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Social proof - Responsive text size and spacing */}
                    <div className="mt-6 sm:mt-8 md:mt-10 text-gray-200 text-sm sm:text-base md:text-lg px-4">
                        {t('joinThousands')}
                    </div>
                </div>

                {/* Footer text - Moved outside the main content div and positioned with better spacing */}
                <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 text-center">
                    <p className="text-xs sm:text-sm md:text-base text-gray-200 px-4">
                        {t('makingAgricultureSmarter')}
                    </p>

                    {/* Scroll indicator - Only visible on larger screens */}
                    <div className="hidden sm:flex mt-3 justify-center">
                        <div className="w-5 h-8 border-2 border-white/60 rounded-full flex justify-center p-1">
                            <div className="w-1 h-2 bg-white/80 rounded-full animate-bounce"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
