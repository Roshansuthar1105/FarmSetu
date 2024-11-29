"use client";
import React, { useState } from "react";
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/Input';
import { cn } from '../lib/util';
import { IconBrandGoogle, IconEye, IconEyeOff } from "@tabler/icons-react";
import { Button, Radio, RadioGroup } from "@nextui-org/react";
import useSignup from "../hooks/useSignup";
import avatar from "../data/avatar.json";
export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    selectedAvatar:'',
    role: 'farmer' // Set the default role to 'farmer'
  });
  const {loading, signup}= useSignup();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [ showAvatarContainer , setShowAvatarContainer] =useState();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleRoleChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      role: value // Update role in form data
    }));
  };
  const handleAvatar = (avatar) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedAvatar: avatar // Update selectedAvatar in form data
    }));
    setShowAvatarContainer(!showAvatarContainer);
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    // console.log("Form submitted", formData);
    await signup(formData);
  };

  return (
    <div className="bg-gray-800 pt-20 dark:bg-black">
      
      <div className="max-w-md w-full relative mx-auto overflow-hidden rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-gray-100 dark:bg-black my-20">
        <h2 className="font-bold text-xl text-green-800 dark:text-neutral-200">
          Welcome to FarmSetu
        </h2>
        { 
          formData.selectedAvatar && (
            <img className="absolute top-3 right-3 h-12 w-12 rounded-full border-3 border-green-700 " src={formData.selectedAvatar} alt="Selected Avatar" onClick={()=>setShowAvatarContainer(true)} />
          )
        }
        <form className="my-8 " onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Tyler Durden"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </LabelInputContainer>

          {/* Radio Group for Role Selection */}
          <LabelInputContainer className="mb-4">
            <Label>Role</Label>
            <RadioGroup
              orientation="horizontal" // Change to vertical if preferred
              aria-label="Role"
              value={formData.role}
              onValueChange={handleRoleChange} // Use onValueChange for NextUI's RadioGroup
            >
              <Radio value="farmer">Farmer</Radio>
              <Radio value="seller">Seller</Radio>
              <Radio value="cooperative">Cooperative</Radio>
            </RadioGroup>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            {/* <Button onClick={() => setShowAvatarContainer(true)} >Select Avatar</Button> */}
          
                <h3 className="text-lg font-bold mb-4">Select Your Avatar</h3>
                <div className="grid grid-cols-5 gap-4">
                  {avatar.map((avatar) => (
                    <div className={`rounded-full overflow-hidden ${formData.selectedAvatar===avatar.avatar ? 'border-green-700 border-3':'border-slate-0' }  border-3 h-12 w-12`} >
                    <img
                      key={avatar.id}
                      src={avatar.avatar}
                      alt={`Avatar ${avatar.id}`}
                      className="w-full h-auto rounded-lg cursor-pointer"
                      onClick={() => handleAvatar(avatar.avatar)}
                      style={{height:"50px",width:"50px"}}
                      />
                      </div>
                  ))}
                </div>
            
          </LabelInputContainer>
          <LabelInputContainer className="mb-4 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
            />
            <TogglePasswordButton
              isVisible={showPassword}
              onClick={() => setShowPassword(!showPassword)}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8 relative">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <TogglePasswordButton
              isVisible={showPassword}
              onClick={() => setShowPassword(!showPassword)}
            />
          </LabelInputContainer>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            disabled={loading}
          >
            {loading? <span className="loading loading-spinner"></span> : 'Sign up'}
            {/* Sign up &rarr; */}
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          {/* <div className="flex flex-col space-y-4">
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
          </div> */}
        </form>
      </div>
      
    </div>
  );
}

const TogglePasswordButton = ({ isVisible, onClick }) => (
  <span
    onClick={onClick}
    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
  >
    {isVisible ? (
      <IconEyeOff className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
    ) : (
      <IconEye className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
    )}
  </span>
);

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
