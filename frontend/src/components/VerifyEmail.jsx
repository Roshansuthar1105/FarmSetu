import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiCheckCircle, FiXCircle, FiLoader, FiHome, FiLogIn, FiMail } from 'react-icons/fi';
import { useAuthContext } from '../context/AuthContext';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('Verifying your email address...');
  const [countdown, setCountdown] = useState(3);
  const [email, setEmail] = useState('');
  const {BACKEND_URL} = useAuthContext();
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

      // Show loading toast
      const loadingToast = toast.loading('Verifying your email address...');

      try {
        await axios.post(`${BACKEND_URL}/api/auth/verify-email`, { token });
        
        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        toast.success('Email verified successfully! Redirecting to login...', {
          duration: 4000
        });
        
        setStatus('success');
        setMessage('Email verified successfully!');
        
        // Start countdown for redirect
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
        // Dismiss loading toast and show error
        toast.dismiss(loadingToast);
        const errorMsg = error.response?.data?.error || 'Verification failed. Link may be expired or invalid.';
        toast.error(errorMsg, {
          duration: 5000
        });
        
        setStatus('error');
        setMessage(errorMsg);
      }
    };
    
    verifyToken();
  }, [searchParams, navigate]);
  const handleResendVerification = async () => {
    const emailToUse = email || searchParams.get('email');
    
    if (!emailToUse) {
      toast.error('Email address not found. Please go to login and request a new link.', {
        duration: 4000,
      });
      return;
    }

    const loadingToast = toast.loading('Sending verification email...');

    try {
      await axios.post(`${BACKEND_URL}/api/auth/resend-verification`, { 
        email: emailToUse 
      });
      
      toast.dismiss(loadingToast);
      toast.success('Verification email sent successfully! Please check your inbox.', {
        duration: 4000
      });
      
      setMessage('New verification email sent! Please check your inbox.');
      
    } catch (error) {
      toast.dismiss(loadingToast);
      const errorMsg = error.response?.data?.error || 'Failed to send verification email. Please try again.';
      toast.error(errorMsg, {
        duration: 4000});
    }
  };
  // Loading/Verifying State
  if (status === 'verifying') {
    return (
      <>
        <div>
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
            <div className="text-center">
              {/* Loading Spinner Icon */}
              <div className="mx-auto mb-6 flex justify-center">
                <FiLoader className="w-16 h-16 text-green-500 animate-spin" />
              </div>
              
              <h1 className="text-4xl font-bold text-gray-100 mb-4">
                Verifying Email
              </h1>
              <p className="text-xl text-gray-300 mb-2">
                {message}
              </p>
              <p className="text-gray-400">
                Please wait while we verify your email address...
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Success State
  if (status === 'success') {
    return (
      <>
        <div>
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
            <div className="text-center">
              {/* Success Check Icon */}
              <div className="mx-auto mb-6 flex justify-center">
                <FiCheckCircle className="w-20 h-20 text-green-500" />
              </div>
              
              <h1 className="text-4xl font-bold text-gray-100 mb-4">
                Email Verified!
              </h1>
              <p className="text-xl text-gray-300 mb-4">
                {message}
              </p>
              <p className="text-gray-400 mb-8">
                Redirecting you to login page in {countdown} seconds...
              </p>
              
              <div className="space-x-4">
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FiHome className="w-5 h-5" />
                  Go to Home
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FiLogIn className="w-5 h-5" />
                  Login Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Error State
  if (status === 'error') {
    return (
      <>
        <div>
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
            <div className="text-center">
              {/* Error X Icon */}
              <div className="mx-auto mb-6 flex justify-center">
                <FiXCircle className="w-20 h-20 text-red-500" />
              </div>
              
              <h1 className="text-4xl font-bold text-gray-100 mb-4">
                Verification Failed
              </h1>
              <p className="text-xl text-red-400 mb-4">
                {message}
              </p>
              <p className="text-gray-400 mb-8">
                The verification link may be expired or invalid. Please request a new verification email.
              </p>
              
              <div className="space-x-4">
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FiHome className="w-5 h-5" />
                  Go to Home
                </button>
                <button
                  onClick={handleResendVerification}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  <FiMail className="w-5 h-5" />
                  Resend Verification Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default VerifyEmail;