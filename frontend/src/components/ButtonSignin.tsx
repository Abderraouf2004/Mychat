import axios from 'axios';
import { useNavigate } from 'react-router-dom';
type user={
  email:string;
  password:string;
};

const ButtonSignin = ({ email,password}:user) => {
  const navigate=useNavigate();
  const signin=async()=>{
   try {
      await axios.post('http://localhost:8080/api/auth/signin', {
        email,
        password
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,}
      );
        navigate('/home');  
    } catch (error: any) {
      console.error('Login failed:', error.response?.data || error.message);

    }
  }
  return (
    <div className='bg-fuchsia-950 w-28 h-10 flex justify-center items-center text-white rounded-xl shadow-xl'>
      <button onClick={signin}>SignIn</button>
    </div>
   
  )
}

export default ButtonSignin