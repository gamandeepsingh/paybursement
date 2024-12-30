import { RootState } from "@/redux/store";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOutUserSuccess } from "@/redux/user/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const DashNav = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [openBox, setOpenBox] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.showToast) {
      toast.success("Successfully Logged in");
    }
  }, [location.state]);

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
        {openBox && (
          <motion.div
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
            <button
              className="w-full bg-primary text-white py-2 rounded-lg mt-3"
              onClick={handleSignOut}
              disabled={loading}
            >
              {loading ? "Signing out..." : "Sign Out"}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DashNav;

const LETTER_DELAY = 0.025;
const BOX_FADE_DURATION = 0.125;

const FADE_DELAY = 5;
const MAIN_FADE_DURATION = 0.25;

const SWAP_DELAY_IN_MS = 5500;

const Typewrite = ({ examples }: { examples: string[] }) => {
  const [exampleIndex, setExampleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setExampleIndex((pv) => (pv + 1) % examples.length);
    }, SWAP_DELAY_IN_MS);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <p className="mb-2.5 text-xs sm:text-lg font-light uppercase">
      <span className="">
        ANSWERING SOON:{" "}
        {examples[exampleIndex].split("").map((l, i) => (
          <motion.span
            initial={{
              opacity: 1,
            }}
            animate={{
              opacity: 0,
            }}
            transition={{
              delay: FADE_DELAY,
              duration: MAIN_FADE_DURATION,
              ease: "easeInOut",
            }}
            key={`${exampleIndex}-${i}`}
            className="relative"
          >
            <motion.span
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: i * LETTER_DELAY,
                duration: 0,
              }}
            >
              {l}
            </motion.span>
            <motion.span
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                delay: i * LETTER_DELAY,
                times: [0, 0.1, 1],
                duration: BOX_FADE_DURATION,
                ease: "easeInOut",
              }}
              className="absolute bottom-[3px] left-[1px] right-0 top-[3px] bg-primarylight"
            />
          </motion.span>
        ))}
      </span>
    </p>
  );
};
