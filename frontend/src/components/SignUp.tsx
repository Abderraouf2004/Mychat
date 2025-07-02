import  { useState } from 'react'
import ButtonSignup from './ButtonSignup';

export const SignUp = () => {
  const [name,Setname]=useState("");
  const [email,Setemail]=useState("");
  const [password,Setpassword]=useState("");
  const [image, Setimage] = useState<File | null>(null);
  return (
    <div className='w-full h-full bg-gradient-to-r from-orange-100 via-blue-300 to-blue-950 p-30'>
      <div className=' flex justify-center items-center bg-white h-96 rounded-3xl shadow-xl '>
           <form onSubmit={(e) => e.preventDefault()} className='h-full w-1/2 flex flex-col justify-around items-center pb-3'>
               <strong className='text-5xl mt-2'>Sign Up</strong>
               <input   className='bg-gray-200 text-black w-96 h-10' value={name} onChange={(e)=>{Setname(e.target.value)}} placeholder='Name' required/>
               <input   className='bg-gray-200 text-black w-96 h-10' value={email} onChange={(e)=>{Setemail(e.target.value)}} type='email' placeholder='Email' required/>
               <input   className='bg-gray-200 text-black w-96 h-10' value={password} onChange={(e)=>{Setpassword(e.target.value)}} type='password' placeholder='Password' minLength={6} required/>
               <input   className='bg-gray-200 text-black w-96 h-10' accept='image/*' onChange={(e)=>{ if (e.target.files && e.target.files.length > 0) {Setimage(e.target.files[0]);}}} type='file' />
                <p>First time here? <a href="/signin">Sign in here for free</a></p>
                <ButtonSignup name={name} email={email} password={password} image={image}/>
            </form>
            <div className='bg-fuchsia-950 h-full w-1/2  flex flex-col justify-around items-center rounded-l-4xl text-white'>
              <strong>Yoo, welcome back !</strong>
            </div>
      </div>    
    </div>
  )
}

 