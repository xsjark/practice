import './App.css';
import Form from './components/Form'
import Home from './components/Home'
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import Create from './components/Create';
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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [newName, setNewName] = useState('');
  const [newJob, setNewJob] = useState('');


  const navigate = useNavigate();

  const handleAction = async (id: number) => {
    const authentication = getAuth();
    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate("/")
        })
    }
    if (id === 1) {
      try {
         signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
          navigate("/")
        })
      } catch (err) {
        console.error(err);
      }
    }
  }

  const currentUser = () => {
    return auth.currentUser;
  }
  
  const logout = () => {
    signOut(auth).then((response) => {
      navigate("/")
    })

  };

  const writeToDB = async (e: any) => {
        e.preventDefault();  
       
        try {
            const docRef = await addDoc(collection(db, "practice_users"), {
              name: newName,
              job: newJob,    
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

  // const googleProvider = new GoogleAuthProvider();

  // const signInWithGoogle = async () => {
  //   try {
  //     const res = await signInWithPopup(auth, googleProvider);
  //     const user = res.user;
  //     const q = query(collection(db, "users"), where("uid", "==", user.uid));
  //     const docs = await getDocs(q);
  //     if (docs.docs.length === 0) {
  //       await addDoc(collection(db, "users"), {
  //         uid: user.uid,
  //         name: user.displayName,
  //         authProvider: "google",
  //         email: user.email,
  //       });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <div className="App">
         <>
        <Routes>
          <Route path='/' element={<Home currentUser={() => currentUser()} logout={() => logout()} />} />
          <Route path='/login' element={<Form title="Login" setEmail={setEmail} setPassword={setPassword} handleAction={() => handleAction(1)} />} />
          <Route path='/register' element={<Form title="Register" setEmail={setEmail} setPassword={setPassword} handleAction={() => handleAction(2)} />} />
          <Route path='/create' element={<Create currentUser={() => currentUser()} navigate={() => navigate("/")} setNewName={setNewName} setNewJob={setNewJob} writeToDB={(e: any) => writeToDB(e)}/>} />
        </Routes>
      </>
    </div>
  );
}

export default App;