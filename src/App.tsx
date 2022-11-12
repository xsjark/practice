import './App.css';
import Form from './components/Form'
import Home from './components/Home'
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import {
  doc,
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";
import { useEffect } from 'react';
import { initializeApp } from "firebase/app";
import Create from './components/Create';
import Read from './components/Read';
import Delete from './components/Delete';
import Update from './components/Update';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID 
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [entries, setEntries] = useState();
  const [newId, setNewId] = useState('');
  const [newName, setNewName] = useState('');
  const [newJob, setNewJob] = useState('');
  const [loggedIn, setLoggedIn] = useState(false)
  
    useEffect(() => {
      const listener = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          setLoggedIn(true);
        } else {
          localStorage.removeItem('authUser');
          setLoggedIn(false);
        }
      });
  
      return () => listener?.();
    }, []);

  const navigate = useNavigate();

  const handleAction = async (id: number) => {
    const authentication = getAuth();
    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate("/")
          setEmail("")
          setPassword("")
        })
        .catch(err => alert(err))
    } 
    if (id === 1) {
        signInWithEmailAndPassword(auth, email, password)
          .then((response) => {
            navigate("/")
            setEmail("")
            setPassword("")
          })
      .catch(err => alert(err))
    }
  }

  const logout = () => {
    signOut(auth).then((response) => {
      navigate("/")
    })

  };

  const createDocument = async () => {
     addDoc(collection(db, "practice_users"), {
        name: newName,
        job: newJob,
      })
      .then(() => {
        navigate("/")
      })
      .catch(error => {
        console.log(error);
      })
  }

  const deleteDocument = async (id: any) => {
    deleteDoc(doc(db, "practice_users", id))
    .then(() => {
      navigate("/")
    })
    .catch(error => {
      console.log(error);
    })
      
  }

  const updateDocument = async (id: any) => {
    updateDoc(doc(db, "practice_users", id), {
      name: newName,
      job: newJob
    })
      .then(() => {
        navigate("/")
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div className="App">
      <>
        <Routes>
          <Route path='/' element={<Home loggedIn={loggedIn} logout={() => logout()} />} />
          <Route path='/login' element={<Form title="Login" setEmail={setEmail} setPassword={setPassword} handleAction={() => handleAction(1)} />} />
          <Route path='/register' element={<Form title="Register" setEmail={setEmail} setPassword={setPassword} handleAction={() => handleAction(2)} />} />
          <Route path='/create' element={<Create loggedIn={loggedIn} navigate={() => navigate("/")} setNewName={setNewName} setNewJob={setNewJob} createDocument={() => createDocument()} />} />
          <Route path='/read' element={<Read loggedIn={loggedIn} navigate={() => navigate("/")} entries={entries} setEntries={setEntries} db={db} />} />
          <Route path='/update' element={<Update loggedIn={loggedIn} navigate={() => navigate("/")} setNewName={setNewName} setNewJob={setNewJob} newId={newId} setNewId={setNewId} updateDocument={updateDocument} />} />
          <Route path='/delete' element={<Delete loggedIn={loggedIn} navigate={() => navigate("/")} setNewName={setNewName} setNewJob={setNewJob} newId={newId} setNewId={setNewId} deleteDocument={deleteDocument}  />} />
        </Routes>
      </>
    </div>
  );
}

export default App;