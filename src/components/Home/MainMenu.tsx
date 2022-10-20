import React, { useState } from "react";
// framer motion
import { motion } from "framer-motion";
import AnimatedLetters from "@src/components/Utils/AnimatedLetters";

interface MainMenuProps {
  goToMainMenu: boolean;
}

interface MenuSectionProps {
  start: boolean;
  photo: string;
  custom: number;
  sectionName: string;
  hoveredSection?: string;
  setHoveredSection: (e: string) => void;
}

const duration = 0.7;
const ease = "easeOut";
const anim = {
  invisible: (custom: number) => ({
    y: `${custom * 200}%`,
    scaleY: 0,
    transition: { ease: "easeIn", duration },
  }),
  visible: {
    y: 0,
    scaleY: 1,
    transition: { ease, duration },
  },
};
const photoAnim = {
  invisible: {
    scale: 10,
    transition: { ease, duration },
  },
  visible: {
    scale: 1,
    transition: { ease, duration },
  },
  hover: {
    scale: 1.05,
    transition: { ease, duration: 0.2 },
  },
};

const MenuSection = ({
  start,
  photo,
  custom,
  sectionName,
  hoveredSection,
  setHoveredSection,
}: MenuSectionProps) => {
  return (
    <motion.div
      custom={custom}
      variants={anim}
      initial="invisible"
      animate={start ? "visible" : "invisible"}
      // style={{
      //   filter:
      //     hoveredSection !== sectionName ? "grayscale(1)" : "grayscale(0)",
      // }}
      className="relative overflow-hidden flex justify-center items-center h-3/6 md:h-full md:w-3/6  "
      onHoverStart={() => setHoveredSection(sectionName)}
    >
      {/* LinkButton */}
      <div className="z-10">
        <h2 className="text-3xl font-light">
          <AnimatedLetters string={sectionName} start={start} delay={0.7} />
        </h2>
      </div>
      {/* Container for image, needs to be absolute so I can center properly the linkButton + allow the dezooming effect on launch */}
      <motion.div
        variants={photoAnim}
        initial="invisible"
        animate={start ? "visible" : "invisible"}
        whileHover="hover"
        className=" absolute top-0 left-0 w-full h-full"
      >
        <img src={photo} className="w-full h-full object-cover object-center" />
      </motion.div>
    </motion.div>
  );
};

export default function MainMenu({ goToMainMenu }: MainMenuProps) {
  const [hoveredSection, setHoveredSection] = useState<string>();

  return (
    <div
      className="fixed z-20 h-screen w-screen flex flex-col md:flex-row"
      id="Menu"
    >
      <MenuSection
        start={goToMainMenu}
        photo="/assets/photos/girl_portrait.png"
        sectionName="Films"
        hoveredSection={hoveredSection}
        setHoveredSection={setHoveredSection}
        custom={-2}
      />
      <MenuSection
        start={goToMainMenu}
        photo="/assets/photos/hands_holding.png"
        sectionName="Photos"
        hoveredSection={hoveredSection}
        setHoveredSection={setHoveredSection}
        custom={2}
      />
      <div className="absolute bottom-0 left-0 w-screen text-xs flex justify-between pb-3 px-4 sm:px-6 xl:text-sm">
        <p>@VirgileHasselmann</p>
        <p>2022</p>
      </div>
    </div>
  );
}
