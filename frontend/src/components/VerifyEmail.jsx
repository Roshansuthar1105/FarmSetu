import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiCheckCircle, FiXCircle, FiLoader, FiHome, FiLogIn, FiMail} from 'react-icons/fi';
import { useAuthContext } from '../context/AuthContext';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('Verifying your email address...');
  const [countdown, setCountdown] = useState(3);
  const [email, setEmail] = useState('');
  const { BACKEND_URL } = useAuthContext();

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get('token');
      const emailFromParams = searchParams.get('email');
      setEmail(emailFromParams);
      
      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link. Token is missing.');
        toast.error('Invalid verification link. Token is missing.');
        return;
      }

      const loadingToast = toast.loading('Verifying your email address...');

      try {
        await axios.post(`${BACKEND_URL}/api/auth/verify-email`, { token });
        
        toast.dismiss(loadingToast);
        toast.success('Email verified successfully! Redirecting to login...', { duration: 4000 });
        
        setStatus('success');
        setMessage('Email verified successfully!');
        
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              navigate('/login');
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(timer);

      } catch (error) {
        toast.dismiss(loadingToast);
        const errorMsg = error.response?.data?.error || 'Verification failed. Link may be expired or invalid.';
        toast.error(errorMsg, { duration: 5000 });
        
        setStatus('error');
        setMessage(errorMsg);
      }
    };
    
    verifyToken();
  }, [searchParams, navigate, BACKEND_URL]);

  const handleResendVerification = async () => {
    const emailToUse = email || searchParams.get('email');
    
    if (!emailToUse) {
      toast.error('Email address not found. Please go to login and request a new link.', { duration: 4000 });
      return;
    }

    const loadingToast = toast.loading('Sending verification email...');

    try {
      await axios.post(`${BACKEND_URL}/api/auth/resend-verification`, { email: emailToUse });
      
      toast.dismiss(loadingToast);
      toast.success('Verification email sent successfully! Please check your inbox.', { duration: 4000 });
      setMessage('New verification email sent! Please check your inbox.');
      
    } catch (error) {
      toast.dismiss(loadingToast);
      const errorMsg = error.response?.data?.error || 'Failed to send verification email. Please try again.';
      toast.error(errorMsg, { duration: 4000 });
    }
  };

  // Loading/Verifying State
  if (status === 'verifying') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="mx-auto mb-6 flex justify-center">
              <FiLoader className="w-16 h-16 text-green-600 dark:text-green-500 animate-spin" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Verifying Email
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Success State
  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="max-w-md mx-auto px-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8 text-center">
                <div className="mx-auto mb-6 flex justify-center">
                  <FiCheckCircle className="w-20 h-20 text-green-600 dark:text-green-500" />
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Email Verified!
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {message}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
                  Redirecting to login page in {countdown} seconds...
                </p>
                
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FiHome className="w-4 h-4" />
                    Home
                  </button>
                  <button
                    onClick={() => navigate('/login')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <FiLogIn className="w-4 h-4" />
                    Login Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="max-w-md mx-auto px-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8 text-center">
                <div className="mx-auto mb-6 flex justify-center">
                  <FiXCircle className="w-20 h-20 text-red-600 dark:text-red-500" />
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Verification Failed
                </h1>
                <p className="text-red-600 dark:text-red-400 text-sm mb-4">
                  {message}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                  The verification link may be expired or invalid. Please request a new verification email.
                </p>
                
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FiHome className="w-4 h-4" />
                    Home
                  </button>
                  <button
                    onClick={handleResendVerification}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
                  >
                    <FiMail className="w-4 h-4" />
                    Resend Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default VerifyEmail;