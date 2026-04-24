import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Generate from './pages/Generate'

export const ServerUrl = "http://localhost:8000"

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        dispatch(setUserData(null));
        return;
      }
      try {
        const response = await axios.get(`${ServerUrl}/api/user/current-user`, {
          withCredentials: true
        });
        dispatch(setUserData(response.data.user));
      } catch (error) {
        console.error("Error fetching current user:", error);
        dispatch(setUserData(null));
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/generate" element={<Generate />} />
    </Routes>
  )
}

export default App