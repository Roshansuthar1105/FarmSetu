"use client";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/Input';
import { cn } from '../lib/util';
import { FaLocationArrow, FaArrowLeft, FaLock, FaCheckCircle } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthContext } from "../context/AuthContext";

export default function ResetPassword() {
    const { t } = useTranslation();
    const { BACKEND_URL } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [validToken, setValidToken] = useState(false);
    const [verifying, setVerifying] = useState(true);
    const [resetSuccess, setResetSuccess] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const resetToken = queryParams.get('token');
        
        if (resetToken) {
            setToken(resetToken);
            verifyToken(resetToken);
        } else {
            setVerifying(false);
            toast.error('Invalid reset link');
        }
    }, [location]);

    const verifyToken = async (resetToken) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/password-reset/verify-token/${resetToken}`);
            
            if (response.data.success) {
                setValidToken(true);
            } else {
                toast.error(response.data.error || 'Invalid or expired reset link');
                setTimeout(() => navigate('/forgot-password'), 3000);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Invalid or expired reset link';
            toast.error(errorMessage);
            setTimeout(() => navigate('/forgot-password'), 3000);
        } finally {
            setVerifying(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/password-reset/reset-password`, {
                token,
                password,
                confirmPassword
            });
            
            if (response.data.success) {
                setResetSuccess(true);
                toast.success(response.data.message);
                setTimeout(() => navigate('/login'), 3000);
            } else {
                toast.error(response.data.error || 'Failed to reset password');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Failed to reset password. Please try again.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (verifying) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="text-gray-600 dark:text-gray-400 mt-4">Verifying reset link...</p>
                </div>
            </div>
        );
    }

    if (resetSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
                <div className="max-w-md mx-auto px-4 py-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-6 text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                                <FaCheckCircle className="text-4xl text-green-600 dark:text-green-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Password Reset Successful!</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                                Your password has been changed successfully. You can now log in with your new password.
                            </p>
                            <Link to="/login">
                                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200">
                                    Go to Login
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!validToken) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
                <div className="max-w-md mx-auto px-4 py-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-6 text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
                                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Invalid Reset Link</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                                This password reset link is invalid or has expired.
                            </p>
                            <Link to="/forgot-password">
                                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200">
                                    Request New Reset Link
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
            <div className="max-w-md mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                        <FaLock className="text-3xl text-green-600 dark:text-green-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Create New Password
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Please enter your new password below
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1.5 block">
                                    New Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition pr-12"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
                                    >
                                        {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                                    </button>
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1.5 block">
                                    Confirm New Password
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                                    required
                                />
                            </div>
                            
                            <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                                Password must be at least 6 characters long
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
                                        Resetting...
                                    </>
                                ) : (
                                    <>
                                        Reset Password <FaLocationArrow className="text-sm" />
                                    </>
                                )}
                            </button>
                        </form>
                        
                        <div className="text-center mt-6">
                            <Link to="/login" className="text-green-600 hover:text-green-700 text-sm font-medium inline-flex items-center gap-1">
                                <FaArrowLeft className="text-xs" /> Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}