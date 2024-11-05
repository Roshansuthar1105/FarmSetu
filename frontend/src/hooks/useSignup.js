import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser}= useAuthContext();
  const signup = async ({ name, email, password, confirmPassword, role }) => {
    const success = handleInputErrors({ name, email, password, confirmPassword, role });
    if (!success) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/auth/signup', {
        name,
        email,
        password,
        confirmPassword,
        role,
      });

      if (response.status === 201) {
        toast.success('Signup successful!');
        // You can redirect the user or handle success as needed
        // console.log(response.data);
        const data= response.data;
        localStorage.setItem('user', JSON.stringify(data));
        setAuthUser(data);
      } else {
        throw new Error(response.data.error || 'Signup failed');
      }
    } catch (err) {
      toast.error(err.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};

export default useSignup;

function handleInputErrors({ name, email, password, confirmPassword, role }) {
  if (!name || !email || !password || !confirmPassword || !role) {
    toast.error('Please fill in all the fields');
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
  return true;
}
