import { useCallback, useEffect, useState } from 'react';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { signOutUserSuccess, updateUserSuccess } from './redux/user/userSlice';
import './App.css'
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-API-Key'] = import.meta.env.VITE_BACKEND_API_KEY; 

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const res = await axios.get(`/api/auth/check-token`);
        const data = res.data;
        if (data.success === false) {
          dispatch(signOutUserSuccess());
        }

        dispatch(updateUserSuccess(data.user));
      } catch (error) {
        console.error("Error checking token validity:", error);
      }
    };

    checkTokenValidity();
  }, []);

  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("themeMode") || "dark"
  );

  const darkTheme = useCallback(() => {
    setThemeMode("dark");
  }, []);

  const lightTheme = useCallback(() => {
    setThemeMode("light");
  }, []);

  useEffect(() => {
    const updateTheme = () => {
      document.documentElement.className = themeMode;
      localStorage.setItem("themeMode", themeMode);
    };

    updateTheme();
  }, [themeMode]);
  
  return (
    <>
    <Navbar/>
      <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 2000,
            style: {
              background: "#32de8a",
              fontSize: '12px',
              color: "#000",
              fontFamily: "Urbanist, 'sans-serif",
              borderRadius: "100px",
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
            },
          }}
          />
    </>
  )
}

export default App
