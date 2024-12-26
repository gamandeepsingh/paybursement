import { useCallback, useEffect, useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { signOutUserSuccess, updateUserSuccess } from './redux/user/userSlice';
import './App.css'
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { RootState } from './redux/store';
import Loader from './components/Loader';
import Banner from './components/Banner';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-API-Key'] = import.meta.env.VITE_BACKEND_API_KEY; 

function App() {
  const dispatch = useDispatch();
  const {loading} = useSelector((state:RootState) => state.user);

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const res = await axios.get(`/api/user/profile`, {
          headers: { Authorization: `${localStorage.getItem("token")}` },
          withCredentials: true,
        });
        const data = res.data;
        if (data.success === false) {
          dispatch(signOutUserSuccess());
          return;
        }
        dispatch(updateUserSuccess(data));
      } catch (error) {
        console.error("Error checking token validity:", error);
        dispatch(signOutUserSuccess());
      }
    };

    checkTokenValidity();
  }, []);

  const themeMode = localStorage.getItem("themeMode") || "dark";

  useEffect(() => {
    const updateTheme = () => {
      document.documentElement.className = themeMode;
      localStorage.setItem("themeMode", themeMode);
    };

    updateTheme();
  }, [themeMode]);

  if(loading) return <div><Loader/></div>
  
  return (
    <>
    <Banner/>
    <Navbar/>
    <Outlet />
      <Toaster
          position="bottom-left"
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
