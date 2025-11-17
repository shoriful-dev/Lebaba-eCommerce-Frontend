import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/features/auth/authSlice';

const Login = () => {
  const [message, setMessage] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [loginUser, {isLoading, error}] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data).unwrap();
      const {token, user} = response;
      alert('Login Successful!')
      dispatch(setUser({user}))
      navigate('/')
    } catch (error) {
      setMessage('Please Provide a valid email and password!', error)
    }
  };

  return (
    <section className="h-screen flex items-center justify-center P-2">
      <div className="shadow bg-white p-8 max-w-sm mx-auto">
        <h2 className="text-2xl font-semibold pt-5">Please Login</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 max-w-sm mx-auto pt-6"
        >
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: true })}
            className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded"
          />
          {errors.email && (
            <span className="text-red-500">Email is required</span>
          )}
          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: true })}
            className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded"
          />
          {errors.password && (
            <span className="text-red-500">Password is required</span>
          )}
          {
            message && <p className='text-red-500'>{message}</p>
          }
          <button className="w-full mt-5 bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-md">
            Login
          </button>
        </form>
        <div className="my-5 italic text-sm text-center">
          Don't have an account?
          <Link
            to={'/register'}
            className="text-red-700 px-1 underline cursor-pointer"
          >
            Register
          </Link>
          here.
        </div>
      </div>
    </section>
  );
}

export default Login;
