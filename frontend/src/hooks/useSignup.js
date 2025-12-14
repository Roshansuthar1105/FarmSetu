import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser, BACKEND_URL } = useAuthContext();

  const signup = async (formData) => {
    // Destructure all fields to validate
    const { name, email, password, confirmPassword, role, selectedAvatar, mobileNumber, address } = formData;
    
    // Validate inputs
    const success = handleInputErrors({ name, email, password, confirmPassword, role, selectedAvatar, mobileNumber });
    if (!success) return;

    setLoading(true);
    try {
      // Send the complete object to backend
      const response = await axios.post(`${BACKEND_URL}/api/auth/signup`, {
        name,
        email,
        password,
        confirmPassword,
        role,
        avatar: selectedAvatar,
        mobileNumber,
        address // This is an object: { village, city, district, state, pincode }
      });

      if (response.status === 201) {
        toast.success('Signup successful!');
        const data = response.data;
        // Save to local storage and context
        localStorage.setItem('user', JSON.stringify(data));
        setAuthUser(data);
      } else {
        throw new Error(response.data.error || 'Signup failed');
      }
    } catch (err) {
      toast.error(err.response?.data?.error || err.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};

export default useSignup;

// Helper function for validation
function handleInputErrors({ name, email, password, confirmPassword, role, selectedAvatar, mobileNumber }) {
  if (!name || !email || !password || !confirmPassword || !role) {
    toast.error('Please fill in all required fields');
    return false;
  }
  if (!mobileNumber) {
    toast.error('Mobile Number is required');
    return false;
  }
  if (password !== confirmPassword) {
    toast.error('Passwords do not match');
    return false;
  }
  if (password.length < 6) {
    toast.error('Password must be at least 6 characters');
    return false;
  }
  if (!selectedAvatar) {
    toast.error("Please Select Avatar");
    return false;
  }
  return true;
}