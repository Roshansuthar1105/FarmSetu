// pages/ForgotPassword.jsx
"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/Input';
import { cn } from '../lib/util';
import { FaLocationArrow, FaArrowLeft } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthContext } from "../context/AuthContext";

export default function ForgotPassword() {
    const { t } = useTranslation();
    const { BACKEND_URL } = useAuthContext();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email) {
            toast.error('Please enter your email address');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/password-reset/forgot-password`, { email });
            
            if (response.data.success) {
                setSubmitted(true);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.error || 'Failed to send reset link');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Something went wrong. Please try again.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950 py-20 min-h-screen">
            <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-gray-100 dark:bg-black">
                
                {!submitted ? (
                    <>
                        <div className="flex items-center mb-6">
                            <Link to="/login" className="text-gray-500 hover:text-green-600 mr-4">
                                <FaArrowLeft />
                            </Link>
                            <h2 className="font-bold text-xl text-green-800 dark:text-neutral-200">
                                Forgot Password?
                            </h2>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                        
                        <form onSubmit={handleSubmit}>
                            <LabelInputContainer className="mb-6">
                                <Label htmlFor="email">{t('email_address')}</Label>
                                <Input
                                    id="email"
                                    placeholder="your@email.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </LabelInputContainer>
                            
                            <button
                                className="bg-gradient-to-br relative group/btn from-green-600 to-green-800 w-full text-white rounded-md h-12 font-bold shadow-lg hover:from-green-500 hover:to-green-700 transition-all"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex justify-center items-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </span>
                                ) : (
                                    <span className="flex gap-2 justify-center items-center">
                                        Send Reset Link <FaLocationArrow />
                                    </span>
                                )}
                                <BottomGradient />
                            </button>
                        </form>
                        
                        <div className="text-center mt-6">
                            <Link to="/login" className="text-blue-500 hover:text-green-700 text-sm">
                                Back to Login
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="text-center">
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
                            <h3 className="font-bold">Check Your Email</h3>
                            <p className="text-sm mt-2">
                                We've sent a password reset link to <strong>{email}</strong>
                            </p>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                            Didn't receive the email? Check your spam folder or try again.
                        </p>
                        
                        <button
                            onClick={() => setSubmitted(false)}
                            className="text-blue-500 hover:text-green-700 text-sm font-medium"
                        >
                            ← Try another email
                        </button>
                        
                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <Link to="/login" className="text-green-600 hover:text-green-700 text-sm">
                                Return to Login
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const BottomGradient = () => (
    <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
);

const LabelInputContainer = ({ children, className }) => (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>
);