"use client";

import React, { useEffect, useState } from 'react';
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store';
import { useTheme } from 'next-themes';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignin, setIsSignin] = useState(true);
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [clicked, setClicked] = useState(false)
  const Router = useRouter()
  const {setUsername,setUserId} = useUserStore()
  const {setTheme} = useTheme();
  useEffect(()=>{
    setTheme("light")
  })

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try{
    e.preventDefault();
    setClicked(true)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(isSignup && name.length < 3){
      setErrorMessage('Name must be at least 3 characters long.');
      setClicked(false)
      return;
    }

    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email format.');
      setClicked(false)
      return;
    }

    if (password.length < 4) {
      setErrorMessage('Password must be at least 4 characters long.');
      setClicked(false)
      return;
    }

    setErrorMessage('');

    const endpoint = isSignin ? 'auth/signin' : 'auth/signup';
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: isSignin ? JSON.stringify({ email, password }) : JSON.stringify({ name, email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Something went wrong');
        setClicked(false);
        return;
      }

      const data = await response.json();
      console.log(data)
      setUsername(data.username);
      setUserId(data.userId);
      Router.push("/dashboard");
    }
    catch(e){
      setClicked(false)
      console.log(e)
    }
  };

  const toggleSigninSignup = () => {
    setIsSignin(!isSignin);
    setIsSignup(!isSignup);
    setErrorMessage('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-gradient-to-b from-white to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-black">Welcome to <span className='text-purple-500'>Workflo!</span></h2>
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          {isSignup && (
            <div>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="mt-1 block w-full px-3 py-2 dark:bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          )}
          <div>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="mt-1 block w-full px-3 py-2 dark:bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mt-1 block w-full px-3  dark:bg-white py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-500 focus:border-purple-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
            </button>
          </div>
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          <div className='flex items-center justify-center'>
            {clicked ? <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg> : 
            <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-500 text-white font-semibold rounded-md shadow hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
            {isSignin ? 'Sign In' : 'Sign Up'}
          </button>}
          </div>  
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {isSignin ? (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={toggleSigninSignup}
                  className="text-purple-500 hover:underline"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={toggleSigninSignup}
                  className="text-purple-500 hover:underline"
                >
                  Sign In
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </main>
  );
}
