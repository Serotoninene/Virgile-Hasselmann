import React, { useContext, useState } from "react";
// Framer motion
import { AnimatePresence, motion } from "framer-motion";
// Components
import Video from "@src/components/Utils/Video";
import AnimatedLetters from "@src/components/Utils/AnimatedLetters";
import UserLogin from "./UserLogin";
import { AuthContext } from "@src/contexts/AuthProvider";

const containerAnim = {
  hidden: {},
  shown: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 1,
      staggerDirection: -1,
    },
  },
};

const itemsAnim = {
  hidden: { y: 50, opacity: 0 },
  shown: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.3, 0.01, -0.05, 0.95] },
  },
};

const loginAnim = {
  hidden: { opacity: 0 },
  shown: { opacity: 1 },
};

const Content = () => {
  const { userStatus } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="relative z-10 h-screen flex flex-col justify-between items-center pt-16 pb-14 px-4 xs:pt-[88px] xs:pb-16 xs:px-6 lg:pb-6 lg:justify-end lg:items-end">
      <h1 className="text-5xl text-center xs:text-6xl lg:text-end lg:text-8xl">
        <AnimatedLetters string="Virgile" fontWeight="font-black" />
        <br />
        <AnimatedLetters
          string="Hasselmann"
          fontWeight="font-black"
          delay={0.6}
          stagger={0.01}
        />
      </h1>
      <motion.div
        variants={containerAnim}
        initial="hidden"
        animate="shown"
        exit="hidden"
        className="flex items-end lg:justify-between w-full"
      >
        <motion.p variants={itemsAnim} className="hidden lg:block">
          Made by @Serotoninene, 2022
        </motion.p>
        <motion.p
          variants={itemsAnim}
          className="text-center font-light text-xl xs:text-3xl lg:text-end lg:text-2xl lg:w-[30vw]"
        >
          Supa short text with a biiiig unerline. Explaining basically who is
          Virgile and what he does (can be keywords).
        </motion.p>
      </motion.div>
      <div
        className={
          userStatus === "ADMIN"
            ? "hidden"
            : "absolute w-screen flex justify-center pointer-events-auto bottom-2 xs:bottom-6"
        }
      >
        <p
          className="hidden lg:block opacity-40"
          onClick={() => setIsLogin(true)}
        >
          login
        </p>
        <div className="w-[64px] lg:hidden">
          <img src="/assets/scrollIndicator.svg" className="w-full" />
        </div>
      </div>
      {/* if the user is not an admin yet */}
      <AnimatePresence mode="wait">
        {userStatus === "USER" && isLogin && (
          <motion.div
            key="login"
            variants={loginAnim}
            initial="hidden"
            animate="shown"
            exit="hidden"
            className={`flex absolute top-0 left-0 h-screen w-screen backdrop-blur-lg bg-white/30 justify-center items-center`}
          >
            <UserLogin setIsLogin={setIsLogin} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function HeroVideo() {
  return (
    <>
      <Content />
      {/* Video background */}
      <div className="absolute h-screen w-screen top-0 left-0 overflow-hidden flex justify-center items-center opacity-80">
        <Video
          src="https://virgile-portfollio.s3.amazonaws.com/videos/heroVideo.mp4"
          type="mp4"
          placeholder="https://virgile-portfollio.s3.amazonaws.com/photos/heroVideo_placeholder.png"
          priority={true}
        />
      </div>
    </>
  );
}
