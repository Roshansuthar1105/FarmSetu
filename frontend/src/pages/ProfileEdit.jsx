"use client";
import React, { useEffect, useState } from "react";
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/Input';
import { Button } from "@nextui-org/react";
import avatar from "../data/avatar.json";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

function ProfileEdit() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { BACKEND_URL, authUser, setAuthUser } = useAuthContext();
  
  // State for form data matching the new schema
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: '',
    mobileNumber: '',
    address: { village: '', city: '', district: '', state: '', pincode: '' }
  });

  // Pre-fill form with existing user data
  useEffect(() => {
    if (authUser) {
      setFormData({
        name: authUser.name || '',
        email: authUser.email || '',
        avatar: authUser.avatar || '',
        mobileNumber: authUser.mobileNumber || '',
        // Handle address gracefully if it doesn't exist yet
        address: authUser.address || { village: '', city: '', district: '', state: '', pincode: '' }
      });
    }
  }, [authUser]);

  // Handler for nested address changes
  const handleAddressChange = (key, value) => {
    setFormData(prev => ({
        ...prev,
        address: { ...prev.address, [key]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the SECURE route (patches the logged-in user)
      const response = await fetch(`${BACKEND_URL}/api/user/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authUser.token}` // Or rely on cookies
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success(t('profile_updated_successfully'));
        // Update global context
        setAuthUser(data); 
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/profile');
      } else {
        toast.error(data.error || t('error_updating_profile'));
      }
    } catch (error) {
      console.error('Error patching form data:', error);
      toast.error("Network Error: Could not update profile.");
    }
  }

  return (
    <div className='w-full min-h-screen bg-gradient-to-b from-slate-700 to-slate-900 py-20'>
        <h2 className='text-white text-3xl text-center font-bold mb-8'>{t('edit_profile')}</h2>
        
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
          
          {/* Personal Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="name" className="text-gray-300 mb-2 block">{t('name')}</Label>
                <Input 
                    id="name" 
                    type="text" 
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                    required 
                    className="bg-gray-700 text-white border-gray-600 focus:border-green-500"
                />
              </div>
              <div>
                <Label htmlFor="mobile" className="text-gray-300 mb-2 block">Mobile Number</Label>
                <Input 
                    id="mobile" 
                    type="text" 
                    value={formData.mobileNumber} 
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    className="bg-gray-700 text-white border-gray-600 focus:border-green-500"
                />
              </div>
          </div>

          <div className="mb-6">
             <Label htmlFor="email" className="text-gray-300 mb-2 block">{t('email')}</Label>
             <Input 
                id="email" 
                type="email" 
                value={formData.email} 
                disabled // Email usually shouldn't be changed easily
                className="bg-gray-700 text-gray-400 border-gray-600 cursor-not-allowed"
             />
             <p className="text-xs text-gray-500 mt-1">Email cannot be changed directly.</p>
          </div>

          {/* Address Section */}
          <div className="mb-8 bg-gray-900/50 p-6 rounded-lg border border-gray-700">
             <h3 className="text-green-400 font-semibold mb-4 uppercase text-sm tracking-wider">Location Details</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <Label className="text-gray-400 mb-1 block">Village</Label>
                    <Input 
                        value={formData.address.village} 
                        onChange={(e) => handleAddressChange('village', e.target.value)} 
                        className="bg-gray-700 text-white border-gray-600"
                    />
                </div>
                <div>
                    <Label className="text-gray-400 mb-1 block">City</Label>
                    <Input 
                        value={formData.address.city} 
                        onChange={(e) => handleAddressChange('city', e.target.value)} 
                        className="bg-gray-700 text-white border-gray-600"
                    />
                </div>
                <div>
                    <Label className="text-gray-400 mb-1 block">District</Label>
                    <Input 
                        value={formData.address.district} 
                        onChange={(e) => handleAddressChange('district', e.target.value)} 
                        className="bg-gray-700 text-white border-gray-600"
                    />
                </div>
                <div>
                    <Label className="text-gray-400 mb-1 block">State</Label>
                    <Input 
                        value={formData.address.state} 
                        onChange={(e) => handleAddressChange('state', e.target.value)} 
                        className="bg-gray-700 text-white border-gray-600"
                    />
                </div>
                <div>
                    <Label className="text-gray-400 mb-1 block">Pincode</Label>
                    <Input 
                        value={formData.address.pincode} 
                        onChange={(e) => handleAddressChange('pincode', e.target.value)} 
                        className="bg-gray-700 text-white border-gray-600"
                    />
                </div>
             </div>
          </div>

          {/* Avatar Section */}
          <div className="mb-8">
            <Label className="text-gray-300 mb-3 block text-lg font-medium">{t('avatar')}</Label>
            <div className="flex flex-wrap gap-4 bg-gray-900 p-6 rounded-lg border border-gray-700">
              {avatar.map((av, index) => (
                <div key={index} className="relative group">
                    <img
                        src={av.avatar}
                        alt={`Avatar`}
                        className={`w-16 h-16 rounded-full cursor-pointer transition-all duration-200 ${
                            formData.avatar === av.avatar 
                            ? 'ring-4 ring-green-500 scale-110' 
                            : 'opacity-60 hover:opacity-100 hover:scale-105'
                        }`}
                        onClick={() => setFormData({ ...formData, avatar: av.avatar })}
                    />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button 
                type="button" 
                className="bg-transparent border border-gray-600 text-white hover:bg-gray-700"
                onClick={() => navigate('/profile')}
            >
                Cancel
            </Button>
            <Button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 shadow-lg shadow-green-900/20"
            >
                {t('save_changes')}
            </Button>
          </div>
        </form>
    </div>
  )
}
export default ProfileEdit