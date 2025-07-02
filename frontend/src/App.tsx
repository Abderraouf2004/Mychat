
import { Routes, Route } from 'react-router-dom';
import './App.css'
import { LandingPage } from './components/LandingPage';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import HomePage from './components/HomePage';
import Private from './components/Private';


function App() {
 

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Private><HomePage /></Private>}/>
    </Routes>
  )
}

export default App
