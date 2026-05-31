"use client";
import React, { useState } from "react";
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/Input';
import { cn } from '../lib/util';
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { Radio, RadioGroup } from "@nextui-org/react";
import useSignup from "../hooks/useSignup";
import avatar from "../data/avatar.json";
import { FaLocationArrow, FaSeedling, FaLeaf, FaUserPlus, FaPhone, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

export default function Signup() {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    selectedAvatar: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairTheCaesarSidePart&accessoriesType=Blank&hairColor=Black&facialHairType=BeardLight&facialHairColor=Brown&clotheType=ShirtCrewNeck&clotheColor=Blue02&eyeType=Happy&eyebrowType=RaisedExcited&mouthType=Serious&skinColor=Light',
    role: 'farmer',
    mobileNumber: '',
    address: {
        village: '',
        city: '',
        district: '',
        state: 'Rajasthan', 
        pincode: ''
    }
  });

  const { loading, signup } = useSignup();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAvatarContainer, setShowAvatarContainer] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddressChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [id]: value }
    }));
  };

  const handleRoleChange = (value) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleAvatar = (avatarUrl) => {
    setFormData((prev) => ({ ...prev, selectedAvatar: avatarUrl }));
    setShowAvatarContainer(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
        setError(t('password_mismatch'));
        return;
    }
    setError("");
    await signup(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
            <FaSeedling className="text-3xl text-green-600 dark:text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create your account
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Join FarmSetu and start your farming journey
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <FaUserPlus className="text-green-600 dark:text-green-500" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Sign Up</h2>
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit}>
              {/* Progress indicator */}
              <div className="mb-8 flex items-center justify-between">
                <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div className="w-1/3 h-full bg-green-600 rounded-full"></div>
                </div>
                <div className="flex justify-between px-4 -mt-2">
                  <span className="text-xs text-green-600 font-medium">Personal</span>
                  <span className="text-xs text-gray-400 mx-8">Address</span>
                  <span className="text-xs text-gray-400">Security</span>
                </div>
              </div>

              {/* Personal Details */}
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1.5 block">
                      Full Name *
                    </Label>
                    <Input 
                      id="name" 
                      placeholder="Enter your full name" 
                      type="text" 
                      value={formData.name} 
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="mobileNumber" className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1.5 block">
                      Mobile Number *
                    </Label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                      <Input 
                        id="mobileNumber" 
                        placeholder="9876543210" 
                        type="tel" 
                        value={formData.mobileNumber} 
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1.5 block">
                    Email Address *
                  </Label>
                  <Input 
                    id="email" 
                    placeholder="you@example.com" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    required
                  />
                </div>
              </div>

              {/* Address Section */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-green-600 dark:text-green-500 text-sm" />
                  Location Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                  <div>
                    <Label htmlFor="village" className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1.5 block">
                      Village / Town
                    </Label>
                    <Input 
                      id="village" 
                      placeholder="Enter village name" 
                      value={formData.address.village} 
                      onChange={handleAddressChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1.5 block">
                      City / Tehsil
                    </Label>
                    <Input 
                      id="city" 
                      placeholder="Enter city name" 
                      value={formData.address.city} 
                      onChange={handleAddressChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <Label htmlFor="district" className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1.5 block">
                      District
                    </Label>
                    <Input 
                      id="district" 
                      placeholder="District" 
                      value={formData.address.district} 
                      onChange={handleAddressChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1.5 block">
                      State
                    </Label>
                    <Input 
                      id="state" 
                      placeholder="State" 
                      value={formData.address.state} 
                      onChange={handleAddressChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode" className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1.5 block">
                      Pincode
                    </Label>
                    <Input 
                      id="pincode" 
                      placeholder="302001" 
                      value={formData.address.pincode} 
                      onChange={handleAddressChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </div>
                </div>
              </div>

              {/* Role Selection */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Label className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-3 block">
                  I am a *
                </Label>
                <div className="flex flex-wrap gap-4">
                  {['farmer', 'seller', 'cooperative'].map((role) => (
                    <label
                      key={role}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition ${
                        formData.role === role
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-green-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role}
                        checked={formData.role === role}
                        onChange={() => handleRoleChange(role)}
                        className="w-4 h-4 text-green-600 focus:ring-green-500"
                      />
                      <span className="capitalize text-gray-900 dark:text-white">
                        {role === 'cooperative' ? 'Cooperative Society' : role}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Avatar Selection */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Label className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-3 block">
                  Choose an Avatar *
                </Label>
                
                {formData.selectedAvatar ? (
                  <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <img 
                      src={formData.selectedAvatar} 
                      alt="Selected avatar" 
                      className="w-16 h-16 rounded-full border-4 border-green-500 object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Your selected avatar</p>
                      <button
                        type="button"
                        onClick={() => setShowAvatarContainer(!showAvatarContainer)}
                        className="text-sm text-green-600 hover:text-green-700 mt-1"
                      >
                        {showAvatarContainer ? 'Cancel' : 'Change avatar'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowAvatarContainer(true)}
                    className="w-full py-3 px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-green-500 hover:text-green-600 transition"
                  >
                    + Click to select an avatar
                  </button>
                )}

                {showAvatarContainer && (
                  <div className="mt-4 p-4 bg-gray dark:bg-gray-900 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Choose your avatar:</p>
                    <div className="grid grid-cols-5 sm:grid-cols-8 gap-3">
                      {avatar.map((av) => (
                        <div
                          key={av.id}
                          onClick={() => handleAvatar(av.avatar)}
                          className={`cursor-pointer transition-all transform hover:scale-105 ${
                            formData.selectedAvatar === av.avatar
                              ? ''
                              // 'ring-2 ring-green-500 ring-offset-2 rounded-full'
                              : ''
                          }`}
                        >
                          <img
                            src={av.avatar}
                            alt="avatar option"
                            className={`w-12 h-12 rounded-full object-cover ring-4 ${formData.selectedAvatar === av.avatar
                              ? 'ring-green-500'
                              :''}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Password Fields */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1.5 block">
                      Password *
                    </Label>
                    <div className="relative">
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        value={formData.password} 
                        onChange={handleChange} 
                        placeholder="Create a password"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
                      >
                        {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">At least 6 characters</p>
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1.5 block">
                      Confirm Password *
                    </Label>
                    <Input 
                      id="confirmPassword" 
                      type={showPassword ? "text" : "password"} 
                      value={formData.confirmPassword} 
                      onChange={handleChange} 
                      placeholder="Confirm your password"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="mt-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account <FaLocationArrow className="text-sm" />
                  </>
                )}
              </button>

              {/* Login Link */}
              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                Already have an account?{' '}
                <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <FaCheckCircle className="text-green-500 text-xs" /> Free forever
            </span>
            <span className="flex items-center gap-1">
              <FaCheckCircle className="text-green-500 text-xs" /> No credit card
            </span>
            <span className="flex items-center gap-1">
              <FaCheckCircle className="text-green-500 text-xs" /> 24/7 support
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}