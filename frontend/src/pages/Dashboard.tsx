import { RootState } from "@/redux/store";
import hero from "../assets/dashboard_illustration/2.png";
import HeroSection from "@/components/HeroSection";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOutUserSuccess } from "@/redux/user/userSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  
  const [openBox, setOpenBox] = useState(false);

  const handleSignOut = ()=>{
    dispatch(signOutUserSuccess()); // Clear Redux state
    localStorage.removeItem("token"); // Clear token
    localStorage.removeItem("user"); // Clear user data
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Clear cookie
    setTimeout(() => {
      window.location.href = "/sign-in"; // Redirect after cleanup
    }, 200);
  }
  return (
    <div className="w-screen min-h-[600px] mt-8 bg-primarylight dark:bg-primaryDark relative">
      <div className="bg-secondary dark:bg-primary">
        <div className="flex justify-between items-center py-5 px-10">
          <h1 className="text-2xl font-bold">Dashboard / <span className="text-xs">PB</span></h1>
          <div className="flex items-center gap-5">
            <h1 className="text-sm hidden sm:block">Welcome, <span className="text-base font-black">{currentUser?.fullname?.firstname}</span></h1>
            <img
              src={currentUser?.profilePicture || `https://ui-avatars.com/api/?name=${currentUser?.fullname?.firstname}+${currentUser?.fullname?.lastname}`}
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
                className="z-50 absolute right-10 top-16 bg-white dark:bg-secondary shadow-lg rounded-lg p-5 w-52"
              >
                <h1 className="text-lg font-bold">Profile</h1>
                <hr className="my-3 border-neutral-300" />
                <p className="text-sm">
                  <span className="font-bold">Welcome,</span> {currentUser?.fullname?.firstname} {currentUser?.fullname?.lastname}
                </p>
                <button
                className="w-full bg-primary text-white py-2 rounded-lg mt-3"
                onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </motion.div>
            )}
          </div>
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-4 place-content-center pt-20 sm:pt-10 max-w-7xl mx-auto">
        <div className="text-left flex flex-col justify-center gap-5 mx-10">
          <HeroSection />
          <BlockInTextCard
            examples={[
              "Does your product work for SMBs?",
              "Can I pause my membership without losing my data?",
              "How does seat based pricing work?",
              "What's the meaning of life?",
            ]}
          />
        </div>
        <div className="grid place-content-center">
          <img src={hero} className="w-full" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

const BlockInTextCard = ({ examples }:{
  examples: string[]
}) => {
  return (
    <div className="w-full max-w-xl space-y-6">
        <Typewrite examples={examples} />
        <hr className="border-neutral-300" />
    </div>
  );
};

const LETTER_DELAY = 0.025;
const BOX_FADE_DURATION = 0.125;

const FADE_DELAY = 5;
const MAIN_FADE_DURATION = 0.25;

const SWAP_DELAY_IN_MS = 5500;

const Typewrite = ({ examples }:{
  examples: string[]
}) => {
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
        EXAMPLE:{" "}
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
              className="absolute bottom-[3px] left-[1px] right-0 top-[3px] bg-neutral-950"
            />
          </motion.span>
        ))}
      </span>
    </p>
  );
};
