"use client";
import React, { useEffect, useState } from "react";
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/Input';
import { cn } from '../lib/util';
import MyNavbar from "../components/MyNavbar";
import Footer from "../components/Footer";
import { IconBrandGoogle, IconEye, IconEyeOff } from "@tabler/icons-react";
import { Button, Radio, RadioGroup } from "@nextui-org/react";
import useSignup from "../hooks/useSignup";
import avatar from "../data/avatar.json";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
function ProfileEdit() {
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
        toast.success('Profile updated successfully');
        setAuthUser(formData);
      } else {
        console.error('Error updating profile:', data.error);
        toast.error("Error updating profile")
      }
    } catch (error) {
      console.error('Error patching form data:', error);
    }
  }
  const { BACKEND_URL, authUser ,setAuthUser } = useAuthContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: '',
    role: '' // Set the default role to 'farmer'
  });
  useEffect(() => {
    setFormData(authUser);
  }, [authUser])
  return (
    <>
      <div className='w-full min-h-screen bg-gray-800 py-20'>
        <h2 className='text-white text-4xl text-center font-semibold'>Edit Your profile </h2>
        <form onSubmit={(e) => handleSubmit(e)} className="max-w-4xl mx-auto m-10 bg-white p-4 rounded-md ">
          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your Name"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Your Email"
              required
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="selectedAvatar">Avatar</Label>
            <div className="flex flex-wrap">
              {avatar.map((avatar, index) => (
                <div key={index} className="m-2 h-10 w-10 ">
                  <img
                    src={avatar.avatar}
                    alt={`Avatar ${index + 1}`}
                    className={`w-10 h-10 rounded-full cursor-pointer border-2 ${formData.avatar === avatar.avatar ? ' border-green-500 bg-green-300 ' : ''} `}
                    onClick={() => setFormData({ ...formData, avatar: avatar.avatar })}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <Label htmlFor="role">Role</Label>
            <RadioGroup
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              orientation="horizontal"
              defaultValue="farmer"
            >
              <Radio value="farmer">Farmer</Radio>
              <Radio value="seller">seller</Radio>
              <Radio value="cooperative">Cooperative</Radio>
            </RadioGroup>
          </div>
          <Button type="submit" color="primary">
            Save Changes
          </Button>
        </form>
      </div>
    </>
  )
}
export default ProfileEdit