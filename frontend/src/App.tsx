import { useEffect } from 'react';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { signOutUserSuccess, updateUserSuccess } from './redux/user/userSlice';
import './App.css'
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import Banner from './components/Banner';
import { Footer } from './components/Footer';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
axios.defaults.withCredentials = true;
// axios.defaults.headers.common['X-API-Key'] = import.meta.env.VITE_BACKEND_API_KEY || ""; 

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        dispatch(signOutUserSuccess());
        return;
      }
  
      try {
        const res = await axios.get(`/api/user/profile`, {
          headers: { Authorization: `bearer ${token}` },
          withCredentials: true,
        });
        const data = res.data;
        dispatch(updateUserSuccess(data));
      } catch (error) {
        console.error("Error checking token validity:", error);
        dispatch(signOutUserSuccess());
      }
    };
    checkTokenValidity();
  }, [dispatch]);

  const themeMode = localStorage.getItem("themeMode") || "dark";

  useEffect(() => {
    const updateTheme = () => {
      document.documentElement.className = themeMode;
      localStorage.setItem("themeMode", themeMode);
    };

    updateTheme();
  }, [themeMode]);
  
  return (
    <>
    <Banner/>
    <Navbar/>
    <Outlet />
    <Footer/>
      <Toaster
          position="top-center"
          toastOptions={{
            duration: 2000,
            style: {
              background: "#9EC8B9",
              fontSize: '12px',
              color: "#000",
              borderRadius: "100px",
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
            },
          }}
          />
    </>
  )
}

export default App
