"use client";
import React, { useState } from "react";
import { Label } from "../components/ui/Label";
import { Input } from "../components/ui/Input";
import { cn } from "../lib/util";
import { Link } from "react-router-dom";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import useLogin from "../hooks/useLogin";
import { FaLocationArrow, FaSeedling } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
            <FaSeedling className="text-3xl text-green-600 dark:text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t("welcome_farmsetu")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to your account
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div>
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1.5 block">
                    {t("email_address")}
                  </Label>
                  <Input
                    id="email"
                    placeholder={t("your_email")}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1.5 block">
                    {t("password")}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      placeholder="••••••••"
                      type={passwordVisible ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
                    >
                      {passwordVisible ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-right mt-2">
                <Link
                  to="/forgot-password"
                  className="text-sm text-green-600 hover:text-green-700 dark:text-green-500 font-medium"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    {t("login")} <FaLocationArrow className="text-sm" />
                  </>
                )}
              </button>

              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                {t("dont_have_account")}{" "}
                <Link to="/signup" className="text-green-600 hover:text-green-700 font-medium">
                  {t("sign_up")}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}