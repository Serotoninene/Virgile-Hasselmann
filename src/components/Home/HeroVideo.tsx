import React from "react";
// Framer motion
import { motion } from "framer-motion";
// Components
import Video from "@src/components/Utils/Video";
import AnimatedLetters from "@src/components/Utils/AnimatedLetters";

import DarkGradients from "./DarkGradients";
import AnimatedArrow from "../Utils/AnimatedArrow";
import Image from "next/image";
import { photoLink } from "@src/contexts/store";
import { AnimatedWords } from "../Utils/AnimatedWords.tsx";

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
    transition: {
      duration: 0.6,
    },
  },
};

const Content = () => {
  return (
    <div
      id="HeroVideo"
      className="relative z-10 h-screen flex flex-col justify-between items-center pt-16 pb-14 px-4 xs:pt-[88px] xs:pb-16 xs:px-6 lg:pb-6 lg:justify-end lg:items-end"
    >
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
        <motion.p
          variants={itemsAnim}
          // transition={{ ease: [0.3, 0.01, -0.05, 0.95] }}
          className="hidden lg:block"
        >
          @Virgile Hasselmann, 2023
        </motion.p>
        <div className="text-center font-light text-xl xs:text-3xl lg:text-end lg:text-2xl lg:w-[30vw]">
          <AnimatedWords
            ease="easeOut"
            delay={0.6}
            duration={0.4}
            stagger={0.02}
            string="Spectacles, musique, danse, sport, entreprises... Je crée des vidéos
          artistiques pour mettre en lumière votre projet."
          />
        </div>
      </motion.div>
      <div className="absolute w-screen flex justify-center bottom-2 xs:bottom-6">
        <AnimatedArrow />
        <div className="lg:hidden">
          <Image
            src="/assets/scrollIndicator.svg"
            alt="scroll indicator"
            width={32}
            height={32}
          />
        </div>
      </div>
    </div>
  );
};

export default function HeroVideo() {
  return (
    <div className="snap-child-start">
      <DarkGradients />
      {/* the text */}
      <Content />
      {/* the video in background */}
      <div className="absolute h-screen w-screen top-0 left-0 overflow-hidden flex justify-center items-center opacity-80">
        <Video
          src={`/videos/herovideo2.mp4`}
          type="mp4"
          placeholder={`${photoLink}/heroVideo_placeholder.png`}
          priority={true}
        />
      </div>
    </div>
  );
}
