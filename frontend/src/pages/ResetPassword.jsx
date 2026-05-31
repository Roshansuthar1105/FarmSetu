// pages/ResetPassword.jsx
"use client";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/Input';
import { cn } from '../lib/util';
import { FaLocationArrow, FaArrowLeft} from "react-icons/fa";
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
        // Get token from URL query parameters
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
            <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950 py-20 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
                    <p className="text-white mt-4">Verifying reset link...</p>
                </div>
            </div>
        );
    }

    if (resetSuccess) {
        return (
            <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950 py-20 min-h-screen">
                <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-gray-100 dark:bg-black">
                    <div className="text-center">
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
                            <h3 className="font-bold">✓ Password Reset Successful!</h3>
                            <p className="text-sm mt-2">
                                Your password has been changed successfully.
                            </p>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                            You can now log in with your new password.
                        </p>
                        
                        <Link to="/login">
                            <button className="bg-gradient-to-br from-green-600 to-green-800 w-full text-white rounded-md h-12 font-bold shadow-lg hover:from-green-500 hover:to-green-700 transition-all">
                                Go to Login
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!validToken) {
        return (
            <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950 py-20 min-h-screen">
                <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-gray-100 dark:bg-black">
                    <div className="text-center">
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                            <h3 className="font-bold">Invalid Reset Link</h3>
                            <p className="text-sm mt-2">
                                This password reset link is invalid or has expired.
                            </p>
                        </div>
                        
                        <Link to="/forgot-password">
                            <button className="bg-gradient-to-br from-green-600 to-green-800 w-full text-white rounded-md h-12 font-bold shadow-lg hover:from-green-500 hover:to-green-700 transition-all">
                                Request New Reset Link
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950 py-20 min-h-screen">
            <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-gray-100 dark:bg-black">
                <div className="flex items-center mb-6">
                    <Link to="/login" className="text-gray-500 hover:text-green-600 mr-4">
                        <FaArrowLeft />
                    </Link>
                    <h2 className="font-bold text-xl text-green-800 dark:text-neutral-200">
                        Create New Password
                    </h2>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                    Please enter your new password below.
                </p>
                
                <form onSubmit={handleSubmit}>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">New Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? <HiEyeOff  /> : <HiEye />}
                            </button>
                        </div>
                    </LabelInputContainer>
                    
                    <LabelInputContainer className="mb-6">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </LabelInputContainer>
                    
                    <div className="mb-4 text-sm text-gray-500">
                        Password must be at least 6 characters long
                    </div>
                    
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
                                Resetting...
                            </span>
                        ) : (
                            <span className="flex gap-2 justify-center items-center">
                                Reset Password <FaLocationArrow />
                            </span>
                        )}
                        <BottomGradient />
                    </button>
                </form>
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