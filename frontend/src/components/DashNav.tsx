import { useState, useEffect, useRef } from "react";
import { RootState } from "@/redux/store";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { signOutUserSuccess } from "@/redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const DashNav = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [openBox, setOpenBox] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setOpenBox(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await axios.post("/api/user/logout");
      dispatch(signOutUserSuccess());
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-secondary dark:bg-primaryDark">
      <div className="flex justify-between items-center py-5 px-10 relative">
        <h1 className="text-2xl font-bold">
          Dashboard / <span className="text-xs">PB</span>
        </h1>
        <div className="flex items-center gap-5">
          <h1 className="text-sm hidden sm:block">
            Welcome,{" "}
            <span className="text-base font-black">
              {currentUser?.fullname?.firstname}
            </span>
          </h1>
          <img
            src={
              currentUser?.profilePicture ||
              `https://ui-avatars.com/api/?name=${currentUser?.fullname?.firstname}+${currentUser?.fullname?.lastname}`
            }
            alt=""
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setOpenBox((pv) => !pv)}
          />
        </div>
        <AnimatePresence>
          {openBox && (
            <motion.div
              ref={boxRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="z-50 absolute right-12 top-16 bg-white dark:bg-secondary shadow-lg rounded-lg p-5 w-52"
            >
              <h1 className="text-lg font-bold">Profile</h1>
              <hr className="my-3 border-neutral-300" />
              <p className="text-sm">
                <span className="font-bold">Welcome,</span>{" "}
                {currentUser?.fullname?.firstname}{" "}
                {currentUser?.fullname?.lastname}
              </p>
              <Link to="/profile" className="text-sm text-primary dark:text-primarylight hover:opacity-70 transition-opacity duration-200 mt-2 block">
              ● Profile Setting
              </Link>
              <button
                className="w-full bg-primary text-white py-2 rounded-lg mt-3"
                onClick={handleSignOut}
                disabled={loading}
              >
                {loading ? "Signing out..." : "Sign Out"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DashNav;
