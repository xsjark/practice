import './App.css';
import Form from './components/Form'
import Home from './components/Home'
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtdHOy5dVSddCRdz_mQmGgsMV2gLSsuAA",
  authDomain: "chakra-reservation.firebaseapp.com",
  databaseURL: "https://chakra-reservation.firebaseio.com",
  projectId: "chakra-reservation",
  storageBucket: "chakra-reservation.appspot.com",
  messagingSenderId: "830300281180",
  appId: "1:830300281180:web:65ffa24157915048554999"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  const handleAction = (id : number) => {
    const authentication = getAuth();
    if(id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
      .then((response) => {
        navigate("/home")
      })
    }
  }
  return (
      <div className="App">
        {email}
        {password}
        <>
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Form title="Login" setEmail={setEmail} setPassword={setPassword} handleAction={() => handleAction(1)}/>} />
            <Route path='/register' element={<Form title="Register" setEmail={setEmail} setPassword={setPassword} handleAction={() => handleAction(2)}/>} />
          </Routes>
        </>
      </div>
  );
}

export default App;