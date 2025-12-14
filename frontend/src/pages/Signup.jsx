"use client";
import React, { useState } from "react";
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/Input';
import { cn } from '../lib/util';
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { Radio, RadioGroup } from "@nextui-org/react";
import useSignup from "../hooks/useSignup";
import avatar from "../data/avatar.json";
import { FaLocationArrow } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

export default function Signup() {
  const { t } = useTranslation();
  
  // State for all form fields including nested address
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    selectedAvatar: '',
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

  // Handle top-level input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle nested address input changes
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
    <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950 py-20 min-h-screen">
      <h1 className="font-bold text-green-500 text-3xl text-center my-10 ">{t('welcome_farmsetu')}</h1>
   
      <div className="max-w-2xl w-full relative mx-auto overflow-hidden rounded-md md:rounded-2xl p-4 md:p-8 shadow-input bg-gray-100 dark:bg-black">
        <h2 className="font-bold text-xl text-green-800 dark:text-neutral-200">
          {t('sign_up')}
        </h2>
        
        {/* Selected Avatar Preview */}
        {formData.selectedAvatar && (
            <img 
                className="absolute top-6 right-6 h-16 w-16 rounded-full border-4 border-green-600 cursor-pointer hover:opacity-80 transition" 
                src={formData.selectedAvatar} 
                alt="Selected" 
                onClick={() => setShowAvatarContainer(!showAvatarContainer)} 
            />
        )}
        
        <form className="my-8" onSubmit={handleSubmit}>
          {/* --- Personal Details --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <LabelInputContainer>
                <Label htmlFor="name">{t('name')}</Label>
                <Input id="name" placeholder="John Doe" type="text" value={formData.name} onChange={handleChange} />
            </LabelInputContainer>
            
            <LabelInputContainer>
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <Input id="mobileNumber" placeholder="9876543210" type="text" value={formData.mobileNumber} onChange={handleChange} />
            </LabelInputContainer>
          </div>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">{t('email_address')}</Label>
            <Input id="email" placeholder="example@gmail.com" type="email" value={formData.email} onChange={handleChange} />
          </LabelInputContainer>

          {/* --- Address Section (NEW) --- */}
          <h3 className="text-gray-400 text-sm font-semibold mb-2 mt-6 uppercase tracking-wider">Location Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            <LabelInputContainer>
                <Label htmlFor="village">Village</Label>
                <Input id="village" placeholder="Village Name" value={formData.address.village} onChange={handleAddressChange} />
            </LabelInputContainer>
            <LabelInputContainer>
                <Label htmlFor="city">City/Tehsil</Label>
                <Input id="city" placeholder="City" value={formData.address.city} onChange={handleAddressChange} />
            </LabelInputContainer>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <LabelInputContainer>
                <Label htmlFor="district">District</Label>
                <Input id="district" placeholder="District" value={formData.address.district} onChange={handleAddressChange} />
            </LabelInputContainer>
            <LabelInputContainer>
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="State" value={formData.address.state} onChange={handleAddressChange} />
            </LabelInputContainer>
            <LabelInputContainer>
                <Label htmlFor="pincode">Pincode</Label>
                <Input id="pincode" placeholder="302001" value={formData.address.pincode} onChange={handleAddressChange} />
            </LabelInputContainer>
          </div>

          {/* --- Role Selection --- */}
          <LabelInputContainer className="mb-6">
            <Label>{t('role')}</Label>
            <RadioGroup orientation="horizontal" value={formData.role} onValueChange={handleRoleChange}>
              <Radio value="farmer">{t('farmer')}</Radio>
              <Radio value="seller">{t('seller')}</Radio>
              <Radio value="cooperative">{t('cooperative')}</Radio>
            </RadioGroup>
          </LabelInputContainer>

          {/* --- Avatar Selection --- */}
          <LabelInputContainer className="mb-6">
             <Label>{t('select_avatar')}</Label>
             <div className={`grid grid-cols-5 gap-3 max-h-32 overflow-y-auto p-2 border border-gray-700 rounded-lg ${showAvatarContainer ? 'block' : ''}`}>
                {avatar.map((av) => (
                  <div key={av.id} className={`rounded-full p-1 cursor-pointer transition-all ${formData.selectedAvatar === av.avatar ? 'bg-green-500 scale-110' : 'hover:bg-gray-700'}`}>
                    <img
                      src={av.avatar}
                      alt="avatar"
                      className="w-10 h-10 rounded-full"
                      onClick={() => handleAvatar(av.avatar)}
                    />
                  </div>
                ))}
             </div>
          </LabelInputContainer>

          {/* --- Password Fields --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <LabelInputContainer className="relative">
                <Label htmlFor="password">{t('password')}</Label>
                <Input id="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} placeholder="••••••••" />
                <TogglePasswordButton isVisible={showPassword} onClick={() => setShowPassword(!showPassword)} />
            </LabelInputContainer>
            <LabelInputContainer className="relative">
                <Label htmlFor="confirmPassword">{t('confirm_password')}</Label>
                <Input id="confirmPassword" type={showPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" />
            </LabelInputContainer>
          </div>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <button
            className="bg-gradient-to-br relative group/btn from-green-600 to-green-800 w-full text-white rounded-md h-12 font-bold shadow-lg hover:from-green-500 hover:to-green-700 transition-all"
            type="submit"
            disabled={loading}
          >
            {loading ? (
                 <span className="flex justify-center items-center gap-2">Processing...</span>
            ) : (
                <span className="flex gap-2 justify-center items-center">
                    {t('sign_up')} <FaLocationArrow />
                </span>
            )}
            <BottomGradient />
          </button>

          <div className="text-center mt-4">
              <span className="text-neutral-600 dark:text-neutral-400">
                  {t('already_have_account')} 
              </span>
              <Link to="/login" className="text-blue-500 hover:underline hover:text-green-700 ml-2">
                  {t('login')}
              </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

// Sub-components
const TogglePasswordButton = ({ isVisible, onClick }) => (
  <span onClick={onClick} className="absolute right-3 top-9 cursor-pointer z-10 p-1">
    {isVisible ? <IconEyeOff className="h-5 w-5 text-gray-400" /> : <IconEye className="h-5 w-5 text-gray-400" />}
  </span>
);

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>
);