import { useEffect } from 'react';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { signOutUserSuccess, updateUserSuccess } from './redux/user/userSlice';
import './App.css'

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
  
  return (
    <div>
      <p className=''>Comeback to you soon :)</p>
    </div>
  )
}

export default App
