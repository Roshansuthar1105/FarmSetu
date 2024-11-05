"use client";
import React, { useState } from "react";
import MyNavbar from "../components/MyNavbar";
import Footer from "../components/Footer";
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/Input';
import { cn } from '../lib/util';
import { IconBrandGoogle } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { IconEye, IconEyeOff } from "@tabler/icons-react"; // Import eye icons
import useLogin from "../hooks/useLogin";

export default function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
    const [email, setEmail] = useState(""); // State to store email
    const [password, setPassword] = useState(""); // State to store password
    const { loading, login } = useLogin();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Login form submitted");
        // console.log("Email:", email);
        // console.log("Password:", password);
        await login(email, password);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <>
            <MyNavbar />
            <div className="mt-20 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    Welcome to AgroTrend
                </h2>
                <form className="my-8" onSubmit={handleSubmit}>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            placeholder="yourname@example.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Update email state
                        />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-8 relative">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            placeholder="••••••••"
                            type={passwordVisible ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Update password state
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-600 dark:text-neutral-400"
                        >
                            {passwordVisible ? <IconEyeOff /> : <IconEye />}
                        </button>
                    </LabelInputContainer>

                    {/* <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner"></span> : 'Login &rarr;'}
            <BottomGradient />
          </button> */}
                    <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex justify-center items-center">
                                {/* Spinner SVG or other spinner */}
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"></path>
                                </svg>
                            </span>
                        ) : (
                            <>
                                Login <span dangerouslySetInnerHTML={{ __html: '&rarr;' }} />
                            </>
                        )}
                        <BottomGradient />
                    </button>


                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                    <div className="flex flex-col space-y-4">
                        <button
                            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                            type="button"
                        >
                            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                Google
                            </span>
                            <BottomGradient />
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <span className="text-neutral-600 dark:text-neutral-400">
                        Don't have an account?{" "}
                    </span>
                    <Link
                        to="/signup"
                        className="text-blue-500 hover:underline dark:text-blue-400"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({ children, className }) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
