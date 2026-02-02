import { useState } from 'react';
import API from '../services/Api';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
  
    const submit = async () => {
      await API.post('/auth/forgotPassword', { email });
      toast.success('Reset link sent');
    };
  
    return (
      <>
  <div className='min-h-screen bg-zinc-100 flex justify-center items-center p-8 '>
    
        <div className='w-full max-w-md bg-purple-200 p-8 justify-center items-center rounded shadow-md'>
        <h3 className='flex justify-center items-center mb-4 text-3xl text-midnightpurple'>Forgot Your Password</h3>
        <input placeholder='Enter your email' value={email} onChange={e => setEmail(e.target.value)}
        className='w-full mx-auto mb-3 p-3' />
        <button onClick={submit} className='w-full mx-auto bg-midnightpurple text-white py-2 rounded'>Send Reset Link</button>
        </div>
        </div>
      </>
    );
  }
  