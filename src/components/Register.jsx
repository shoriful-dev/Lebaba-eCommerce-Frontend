import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../redux/features/auth/authApi';

const Register = () => {
  const [message, setMessage] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [registerUser, {isLoading}] = useRegisterUserMutation();
  const navigate = useNavigate();
  
    const onSubmit = async (data) => {
      try {
        await registerUser(data).unwrap();
        alert('Registration successful!');
        navigate('/login')
      } catch (error) {
        setMessage('Registration Faild!', error)
      }
    };
  return (
    <section className="h-screen flex items-center justify-center P-2">
      <div className="shadow bg-white p-8 max-w-sm mx-auto">
        <h2 className="text-2xl font-semibold pt-5">Please Register</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 max-w-sm mx-auto pt-6"
        >
          <input
            type="text"
            placeholder="Username"
            {...register('username', { required: true })}
            className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded"
          />
          {errors.username && (
            <span className="text-red-500 text-sm">username is required!</span>
          )}
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: true })}
            className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">Email is required!</span>
          )}
          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: true })}
            className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">Password is required!</span>
          )}
          {message && (
            <span className="text-red-500 text-sm">Your given info is not valid!</span>
          )}
          <button className="w-full mt-5 bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-md">
            Register
          </button>
        </form>
        <div className="my-5 italic text-sm text-center">
          Already have an account? Please
          <Link
            to={'/login'}
            className="text-red-700 px-1 underline cursor-pointer"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Register;
