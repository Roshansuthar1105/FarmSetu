"use client";
import React, { useEffect, useState } from "react";
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/Input';
import { Button } from "@nextui-org/react";
import avatar from "../data/avatar.json";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useTranslation } from 'react-i18next';

function ProfileEdit() {
  const { t } = useTranslation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BACKEND_URL}/api/user/${authUser._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(t('profile_updated_successfully'));
        setAuthUser(formData);
      } else {
        console.error('Error updating profile:', data.error);
        toast.error(t('error_updating_profile'))
      }
    } catch (error) {
      console.error('Error patching form data:', error);
    }
  }
  const { BACKEND_URL, authUser ,setAuthUser } = useAuthContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: ''
  });
  useEffect(() => {
    setFormData(authUser);
  }, [authUser])
  return (
    <>
      <div className='w-full min-h-screen bg-gray-800 py-20'>
        <h2 className='text-white text-4xl text-center font-semibold'>{t('edit_profile')} </h2>
        <form onSubmit={(e) => handleSubmit(e)} className="max-w-4xl mx-auto m-10 bg-white p-4 rounded-md ">
          <div className="mb-4">
            <Label htmlFor="name">{t('name')}</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={t('name')}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="email">{t('email')}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder={t('email')}
              required
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="selectedAvatar">{t('avatar')}</Label>
            <div className="flex flex-wrap">
              {avatar.map((avatar, index) => (
                <div key={index} className="m-2 size-14 ">
                  <img
                    src={avatar.avatar}
                    alt={`Avatar ${index + 1}`}
                    className={`rounded-full cursor-pointer border-2 ${formData.avatar === avatar.avatar ? ' border-green-500 bg-green-300 ' : ''} `}
                    onClick={() => setFormData({ ...formData, avatar: avatar.avatar })}
                  />
                </div>
              ))}
            </div>
          </div>
          <Button type="submit" color="primary">
            {t('save_changes')}
          </Button>
        </form>
      </div>
    </>
  )
}
export default ProfileEdit