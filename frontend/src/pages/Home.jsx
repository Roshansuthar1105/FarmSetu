import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import ProductOverview from "../components/ProductOverview";
import Pricing from "../components/Pricing";
import Contact from "../components/Contact";
import React, { Suspense, useState } from 'react';
const LazyChatBot = React.lazy(() => import('../components/ChatBot'));
const LazyLanguage = React.lazy(() => import('../components/LanguageButton'));
const LoadingComponent = () => {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-200 ">
        <div className="w-16 h-16 border-8 border-t-8 border-green-800 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  };
function Home(){
    const [chatBotVisible, setChatBotVisible] = useState(false);
    const [isRotating, setIsRotating] = useState(false);
    const toggleChatBot = () => {
        setIsRotating(true);
        setTimeout(() => setIsRotating(false), 500); // Reset rotation after 1s
        setChatBotVisible(!chatBotVisible);
      };

    return (
        <div>
            <Hero></Hero>
            <Features></Features>
            <Testimonials></Testimonials>
            <ProductOverview></ProductOverview>
            <Pricing></Pricing>
            <Contact></Contact>
            
          <button
            onClick={toggleChatBot}
            className={`z-40 fixed bottom-4 right-4 bg-blue-500 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-transform duration-1000 hover:rotate-[360deg]`}
          >
            {/* <FiMessageSquare size={24} /> */}
            <img src="https://cdn-icons-png.flaticon.com/128/6231/6231457.png" alt="chatbot" className="w-6 h-6 inline-block ml-2" />
          </button>
          <LazyLanguage />
          {/* ChatBot Component */}
          <Suspense fallback={<LoadingComponent />}>
            <LazyChatBot visible={chatBotVisible} onClose={toggleChatBot} />
          </Suspense>
        </div>
    )
}
export default Home;