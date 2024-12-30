import DashNav from "@/components/DashNav";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import hero from "../assets/dashboard_illustration/2.png";
import { useEffect, useState } from "react";
import { heroMarqueeText } from "@/utils/constant";

const Dashboard = () => {
  return (
    <div className="w-screen min-h-screen bg-primarylight dark:bg-primary">
      <DashNav />
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-4 place-content-center pt-20 sm:pt-10 max-w-7xl mx-auto">
        <div className="text-left flex flex-col justify-center gap-5 mx-10">
          <HeroSection />
          <BlockInTextCard
            examples={heroMarqueeText}
          />
        </div>
        <div className="grid place-content-center">
          <img src={hero} className="w-full" alt="" />
        </div>
      </div>
      {/* <AddEmployee /> */}
    </div>
  );
};

export default Dashboard;

const BlockInTextCard = ({ examples }: { examples: string[] }) => {
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
