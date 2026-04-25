import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Generate from "./pages/Generate";
import Components from "./pages/Components";
import ProtectedRoute from "./components/ProtectedRoute";

export const ServerUrl = import.meta.env.VITE_SERVER_URL;

const App = () => {
  const dispatch = useDispatch();
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        dispatch(setUserData(null));
        setAuthLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${ServerUrl}/api/user/current-user`, {
          withCredentials: true,
        });
        dispatch(setUserData(response.data.user));
      } catch (error) {
        console.error("Error fetching current user:", error);
        dispatch(setUserData(null));
      } finally {
        setAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);
  if (authLoading)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#050505",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            border: "2px solid rgba(124,106,247,0.15)",
            borderTop: "2px solid #7C6AF7",
            animation: "spin 0.7s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/generate"
        element={
          <ProtectedRoute>
            <Generate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/components"
        element={
          <ProtectedRoute>
            <Components />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
