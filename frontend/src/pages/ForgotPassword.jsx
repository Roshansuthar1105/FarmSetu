"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/Input';
import { cn } from '../lib/util';
import { FaLocationArrow, FaArrowLeft, FaSeedling, FaEnvelope } from "react-icons/fa";
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
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
            <div className="max-w-md mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                        <FaEnvelope className="text-3xl text-green-600 dark:text-green-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Forgot Password?
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        We'll help you reset it
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-6">
                        {!submitted ? (
                            <>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                                    Enter your email address and we'll send you a link to reset your password.
                                </p>
                                
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-6">
                                        <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1.5 block">
                                            Email Address
                                        </Label>
                                        <Input
                                            id="email"
                                            placeholder="you@example.com"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                                            required
                                        />
                                    </div>
                                    
                                    <button
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Reset Link <FaLocationArrow className="text-sm" />
                                            </>
                                        )}
                                    </button>
                                </form>
                                
                                <div className="text-center mt-6">
                                    <Link to="/login" className="text-green-600 hover:text-green-700 text-sm font-medium inline-flex items-center gap-1">
                                        <FaArrowLeft className="text-xs" /> Back to Login
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <div className="text-center">
                                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
                                    <h3 className="font-bold text-green-800 dark:text-green-400 mb-2">Check Your Email</h3>
                                    <p className="text-sm text-green-700 dark:text-green-300">
                                        We've sent a password reset link to <strong className="block mt-1">{email}</strong>
                                    </p>
                                </div>
                                
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                                    Didn't receive the email? Check your spam folder or try again.
                                </p>
                                
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="text-green-600 hover:text-green-700 text-sm font-medium inline-flex items-center gap-1"
                                >
                                    ← Try another email
                                </button>
                                
                                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                    <Link to="/login" className="text-green-600 hover:text-green-700 text-sm font-medium">
                                        Return to Login
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}