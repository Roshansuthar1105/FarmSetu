import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';

const LazyHome = React.lazy(() => import('./pages/Home'));
const LazyMarketplace = React.lazy(() => import('./pages/Marketplace'));
const LazyProductDetail = React.lazy(() => import('./pages/ProductDetail'));
const LazyChat = React.lazy(() => import('./pages/Chat'));
const LazyNewsFeed = React.lazy(() => import('./pages/NewsFeed'));
const LazyWeather = React.lazy(() => import('./pages/Weather'));
const LazyResources = React.lazy(() => import('./pages/Resources'));
const LazyCourseDetails = React.lazy(() => import('./pages/CourseDetails'));
const LazyCommunityForum = React.lazy(() => import('./pages/CommunityForum'));
const LazyRealTimeMarket = React.lazy(() => import('./pages/RealTimeMarket'));
const LazyLogin = React.lazy(() => import('./pages/Login'));
const LazySignup = React.lazy(() => import('./pages/Signup'));
const LazyFileUploadPage = React.lazy(() => import('./pages/FileUploadPage'));
const LazyForm = React.lazy(() => import('./pages/Form'));
const LazyResult = React.lazy(() => import('./pages/Result'));
const LazyProfile = React.lazy(() => import('./pages/Profile'));
const LazyNotFound = React.lazy(() => import('./pages/NotFound'));
const LazyAbout = React.lazy(() => import('./pages/About'));
const LazyMission = React.lazy(() => import('./pages/Mission'));
const LazyTeam = React.lazy(() => import('./pages/Team'));
const LazyCareers = React.lazy(() => import('./pages/Careers'));
const LazyPress = React.lazy(() => import('./pages/Press'));
const LazyPricing = React.lazy(() => import('./components/Pricing'));
const LazyMyNavbar = React.lazy(() => import('./components/MyNavbar'));
const Navbar = React.lazy(() => import('./components/Navbar'));
// import Navbar from './components/Navbar';

const LazyFooter = React.lazy(() => import('./components/Footer'));
const LazyContact = React.lazy(() => import('./components/Contact'));
const LazyWorkInProgress = React.lazy(() => import('./components/WorkInProgress'));
const LazyFAQ = React.lazy(() => import('./components/FAQ'));
const LazyPrivacy = React.lazy(() => import('./components/Privacy'));
const LazyChatWithCommunity = React.lazy(() => import('./pages/ChatWithCommunity'));
const LazyUserPosts = React.lazy(() => import('./pages/UserPosts.jsx'));
const LazyUserCart = React.lazy(() => import('./pages/UserCart.jsx'));
const LazyPayment = React.lazy(() => import('./pages/Payment.jsx'));
const LazyGovernmentSchemes = React.lazy(() => import('./pages/GovernmentSchemes.jsx'));
const LazyInsuranceSchema = React.lazy(() => import('./pages/InsuranceSchema.jsx'));
const LazyProfileEdit = React.lazy(() => import('./pages/ProfileEdit.jsx'));
const LazyProductEdit = React.lazy(() => import('./pages/ProductEdit.jsx'));
const LazySellerProduct = React.lazy(() => import('./pages/SellerProduct.jsx'));
const LazySellerProductEdit = React.lazy(() => import('./pages/SellerProductEdit.jsx'));
const LazyCropRecommendation = React.lazy(() => import('./pages/CropRecommendation.jsx'));
const LazyChatBot = React.lazy(() => import('./components/ChatBot'));
const LazyLanguage = React.lazy(() => import('./components/LanguageButton.jsx'));
import './i18.js';
import { useTranslation } from 'react-i18next';
import i18n from './i18.js';

const LoadingComponent = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200 ">
      <div className="w-16 h-16 border-8 border-t-8 border-green-800 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};
const ScrollToTop = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]); // Trigger on route change

  return children;
};
export default function App() {
  const { t } = useTranslation(); // Add this line
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };
  useEffect(() => {
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', 'en');
    } else {
      i18n.changeLanguage(localStorage.getItem('language'));
    }
  }, [])
  const { authUser } = useAuthContext();
  const [chatBotVisible, setChatBotVisible] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const toggleChatBot = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 500); // Reset rotation after 1s
    setChatBotVisible(!chatBotVisible);
  };
  return (
    <>
      <Router>
        <ScrollToTop>
          <Suspense fallback={<LoadingComponent />}>
            {/* <LazyMyNavbar /> */}
            <Navbar />
          </Suspense>
          <Routes>
            <Route path="/" element={<Suspense fallback={<LoadingComponent />}><LazyHome /></Suspense>} />
            <Route path="/farmermarketplace" element={<Suspense fallback={<LoadingComponent />}><LazyMarketplace /></Suspense>} />
            <Route path="/product/:id" element={<Suspense fallback={<LoadingComponent />}><LazyProductDetail /></Suspense>} />
            <Route path="/product/edit/:id" element={<Suspense fallback={<LoadingComponent />}><LazyProductEdit /></Suspense>} />
            <Route path="/chat" element={authUser ? <Suspense fallback={<LoadingComponent />}><LazyChat /></Suspense> : <Navigate to='/login' />} />
            <Route path="/localchat" element={authUser ? <Suspense fallback={<LoadingComponent />}><LazyChatWithCommunity /></Suspense> : <Navigate to='/login' />} />
            <Route path="/news" element={<Suspense fallback={<LoadingComponent />}><LazyNewsFeed /></Suspense>} />
            <Route path="/payment" element={<Suspense fallback={<LoadingComponent />}><LazyPayment /></Suspense>} />
            <Route path="/weather" element={<Suspense fallback={<LoadingComponent />}><LazyWeather /></Suspense>} />
            <Route path="/resources" element={<Suspense fallback={<LoadingComponent />}><LazyResources /></Suspense>} />
            <Route path="/courses/:id" element={<Suspense fallback={<LoadingComponent />}><LazyCourseDetails /></Suspense>} />
            <Route path="/community" element={authUser ? <Suspense fallback={<LoadingComponent />}><LazyCommunityForum /></Suspense> : <Navigate to='/login' />} />
            <Route path="/realtimemarket" element={<Suspense fallback={<LoadingComponent />}><LazyRealTimeMarket /></Suspense>} />
            <Route path="/login" element={authUser ? <Navigate to='/' /> : <Suspense fallback={<LoadingComponent />}><LazyLogin /></Suspense>} />
            <Route path="/signup" element={authUser ? <Navigate to='/' /> : <Suspense fallback={<LoadingComponent />}><LazySignup /></Suspense>} />
            <Route path="/fileupload" element={<Suspense fallback={<LoadingComponent />}><LazyFileUploadPage /></Suspense>} />
            <Route path="/form" element={<Suspense fallback={<LoadingComponent />}><LazyForm /></Suspense>} />
            <Route path="/results" element={<Suspense fallback={<LoadingComponent />}><LazyResult /></Suspense>} />
            <Route path="/profile" element={<Suspense fallback={<LoadingComponent />}><LazyProfile /></Suspense>} />
            <Route path="/profile/edit/:id" element={<Suspense fallback={<LoadingComponent />}><LazyProfileEdit /></Suspense>} />
            <Route path="/profile/posts/:id" element={<Suspense fallback={<LoadingComponent />}><LazyUserPosts /></Suspense>} />
            <Route path="/profile/cart/:userId" element={<Suspense fallback={<LoadingComponent />}><LazyUserCart /></Suspense>} />
            <Route path="/profile/products/:userId" element={<Suspense fallback={<LoadingComponent />}><LazySellerProduct /></Suspense>} />
            <Route path="/profile/products/add" element={<Suspense fallback={<LoadingComponent />}><LazySellerProductEdit /></Suspense>} />
            <Route path="/GovernmentSchemes" element={<Suspense fallback={<LoadingComponent />}><LazyGovernmentSchemes /> </Suspense>} />
            <Route path="/InsuranceSchema" element={<Suspense fallback={<LoadingComponent />}><LazyInsuranceSchema /> </Suspense>} />
            <Route path="/crops" element={<Suspense fallback={<LoadingComponent />}><LazyCropRecommendation /> </Suspense>} />
            <Route path="/about" element={<Suspense fallback={<LoadingComponent />}><LazyAbout /> </Suspense>} />
            <Route path="/mission" element={<Suspense fallback={<LoadingComponent />}><LazyMission /> </Suspense>} />
            <Route path="/contact" element={<Suspense fallback={<LoadingComponent />}><LazyContact /> </Suspense>} />
            <Route path="/pricing" element={<Suspense fallback={<LoadingComponent />}><LazyPricing /> </Suspense>} />
            <Route path="/faq" element={<Suspense fallback={<LoadingComponent />}><LazyFAQ /> </Suspense>} />
            <Route path="/privacy" element={<Suspense fallback={<LoadingComponent />}><LazyPrivacy /> </Suspense>} />
            <Route path="/team" element={<Suspense fallback={<LoadingComponent />}><LazyTeam /> </Suspense>} />
            <Route path="/careers" element={<Suspense fallback={<LoadingComponent />}><LazyCareers /> </Suspense>} />
            <Route path="/press" element={<Suspense fallback={<LoadingComponent />}><LazyPress /> </Suspense>} />
            <Route path="/payment-processing" element={<Suspense fallback={<LoadingComponent />}><LazyWorkInProgress /> </Suspense>} />
            <Route path="*" element={<Suspense fallback={<LoadingComponent />}><LazyNotFound /> </Suspense>} />
          </Routes>
          <Toaster />
          {/* <button
            onClick={toggleChatBot}
            className={`z-40 fixed bottom-4 right-4 bg-blue-500 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-transform duration-1000 hover:rotate-[360deg]`}
          >
            <img src="https://cdn-icons-png.flaticon.com/128/6231/6231457.png" alt="chatbot" className="w-6 h-6 inline-block ml-2" />
          </button>
          <LazyLanguage />
          <Suspense fallback={<LoadingComponent />}>
            <LazyChatBot visible={chatBotVisible} onClose={toggleChatBot} />
          </Suspense> */}
          <Suspense fallback={<LoadingComponent />}>
            <LazyFooter />
          </Suspense>
        </ScrollToTop>
      </Router>
    </>
  );
}
