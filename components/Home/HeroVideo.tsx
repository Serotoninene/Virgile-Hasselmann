import React from "react";
// Framer motion
import { motion } from "framer-motion";
// Components
import Video from "components/Utils/Video";
import AnimatedLetters from "components/Utils/AnimatedLetters";

const Content = () => {
  return (
    <div className="relative z-10 h-screen flex flex-col justify-between items-center pt-16 pb-14 px-4 xs:pt-[88px] xs:pb-16 xs:px-6 lg:pb-6 lg:justify-end lg:items-end">
      <h1 className="text-5xl text-center xs:text-6xl lg:text-end lg:text-8xl">
        <AnimatedLetters
          string="Virgile"
          fontWeight="font-black"
          stagger={0.02}
        />
        <br />
        <AnimatedLetters
          string="Hasselmann"
          fontWeight="font-black"
          delay={0.6}
          stagger={0.01}
        />
      </h1>
      <div className="flex items-end lg:justify-between w-full">
        <p className="hidden lg:block">Made by @Serotoninene, 2022</p>
        <p className="text-center font-light text-xl xs:text-3xl lg:text-end lg:text-2xl lg:w-[30vw]">
          Supa short text with a biiiig unerline. Explaining basically who is
          Virgile and what he does (can be keywords).
        </p>
      </div>
      <div className="absolute w-screen flex justify-center bottom-2 xs:bottom-6 lg:hidden">
        <div className="w-[64px]">
          <img src="/assets/utils/scrollIndicator.svg" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default function HeroVideo() {
  return (
    <>
      <Content />
      {/* Video background */}
      <div className="absolute h-screen w-screen top-0 left-0 overflow-hidden flex justify-center items-center">
        <Video
          src="/assets/videos/heroVideo.mp4"
          type="mp4"
          placeholder="/assets/photos/heroVideo_placeholder.png"
        />
      </div>
    </>
  );
}
