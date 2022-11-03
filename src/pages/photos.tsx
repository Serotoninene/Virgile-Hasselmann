import React, { useState } from "react";
// Framer motion
import { AnimatePresence, motion } from "framer-motion";
// Component
import useWindowSize from "@src/hooks/useWindowSize";

const videoLink = "https://virgile-portfollio.s3.amazonaws.com/photos/";

export default function photos() {
  const [isOverview, setIsOverview] = useState(false);
  const [category, setCategory] = useState("Artistiques");
  const [photoDisplayed, setPhotoDisplayed] = useState("girl_portrait.png");

  const handleClick = () => {
    photoDisplayed === "hands_holding.png"
      ? setPhotoDisplayed("girl_portrait.png")
      : setPhotoDisplayed("hands_holding.png");
  };

  return (
    <div
      className="h-screen pt-14 px-2 flex flex-col justify-between relative sm:px-6"
      onClick={handleClick}
    >
      <div className="h-full relative overflow-hidden flex items-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={photoDisplayed}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            src={videoLink + photoDisplayed}
            className="w-full sm:w-fit sm:h-full"
          />
        </AnimatePresence>
      </div>
      <div className="pt-2 pb-1 flex justify-between text-sm 2xl:text-base">
        <p className="font-light">Made by @Serotoninene, 2022</p>
        <ul className="flex">
          <li
            className={`${
              isOverview ? "font-bold" : "font-light"
            } ml-14 hover:font-bold `}
            onClick={() => setIsOverview(!isOverview)}
          >
            Overview
          </li>
          <li className="ml-14 font-light">Categories : </li>
          <li className="ml-14 font-light">Artistiques</li>
          <li className="ml-14 font-light">Professionnelles</li>
        </ul>
      </div>
    </div>
  );
}
