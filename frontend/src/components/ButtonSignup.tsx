// import  { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// type UserProps = {
//   name: string;
//   email: string;
//   password: string;
//   image: File | null;
// };

// const ButtonSignup = ({ name, email, password ,image}: UserProps) => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const signup = async () => {
//     if (!name || !email || !password) {
//       alert('Tous les champs sont obligatoires');
//       return;
//     }

//     setLoading(true);
//     try {
//       const  formData =new FormData();
//       formData.append('name', name);
//       formData.append('email', email);
//       formData.append('password', password);
//        if (image) {
//          formData.append('image', image);
//        }

      
//       await axios.post(
//         'https://mychat-1-4ru5.onrender.com/api/auth/signup',
//         formData,
//         {
          
//           withCredentials: true, 
//         }
//       );

//       navigate('/home');
//     } catch (error: any) {
//       console.error('Signup error:', error);
//       alert(error?.response?.data?.message || 'Erreur lors de l\'inscription');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='bg-fuchsia-950 w-28 h-10 flex justify-center items-center text-white rounded-xl shadow-xl'>
//       <button onClick={signup} disabled={loading}>
//         {loading ? '...' : 'SignUp'}
//       </button>
//     </div>
//   );
// };

// export default ButtonSignup;

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type UserProps = {
  name: string;
  email: string;
  password: string;
  image: File | null;
};

const ButtonSignup = ({ name, email, password, image }: UserProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const signup = async () => {
    if (!name || !email || !password) {
      alert('Tous les champs sont obligatoires');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      if (image) {
        formData.append('image', image);
      }

      await axios.post(
        'https://mychat-1-4ru5.onrender.com/api/auth/signup',
        formData,
        {
          withCredentials: true,
        }
      );

      
      const rawUser = document.cookie
        .split('; ')
        .find(row => row.startsWith('user='))
        ?.split('=')[1];

      if (rawUser) {
        const user = JSON.parse(decodeURIComponent(rawUser));
        console.log('Utilisateur inscrit et connecté :', user);
      } else {
        console.warn('Cookie user introuvable après inscription');
      }

      navigate('/home');
    } catch (error: any) {
      console.error('Signup error:', error);
      alert(error?.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-fuchsia-950 w-28 h-10 flex justify-center items-center text-white rounded-xl shadow-xl'>
      <button onClick={signup} disabled={loading}>
        {loading ? '...' : 'SignUp'}
      </button>
    </div>
  );
};

export default ButtonSignup;

