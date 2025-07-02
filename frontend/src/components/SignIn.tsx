
import ButtonSignin from './ButtonSignin';
import { useState } from 'react';


export const SignIn = () => {

  const [email,Setemail]=useState("");
   const [password,Setpassword]=useState("");
  return (
  <div className='w-full h-full bg-gradient-to-r from-orange-100 via-blue-300 to-blue-950 p-30'>
    <div className=' flex justify-center items-center bg-white h-96 rounded-3xl shadow-xl '>
        <form onSubmit={(e) => e.preventDefault()} className='h-full w-1/2 flex flex-col justify-around items-center pb-3'>
           <strong className='text-5xl mt-2'>Sign In</strong>
           <input className='bg-gray-200 text-black w-96 h-10' value={email} onChange={(e)=>{Setemail(e.target.value)}} type='email' placeholder='Email'/> 
           <input className='bg-gray-200 text-black w-96 h-10' value={password} onChange={(e)=>{Setpassword(e.target.value)}} type='password' placeholder='Password' />
            <p>First time here? <a href="/signup">Sign up here for free</a></p>
             <ButtonSignin  email={email} password={password} />
        </form>
        <div className='bg-fuchsia-950 h-full w-1/2  flex flex-col justify-around items-center rounded-l-4xl text-white'>
          <strong>Hello,Friend  welcome back !</strong>
        </div>
    </div>
  </div>
  );
};

