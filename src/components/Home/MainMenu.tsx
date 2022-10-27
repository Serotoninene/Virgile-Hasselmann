import React, { useState, useContext } from "react";
import Link from "next/link";
// Context
import { CursorContext } from "@src/contexts/CursorProvider";
// framer motion
import { motion } from "framer-motion";
// component
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
  const { setCursorType } = useContext(CursorContext);

  return (
    <Link href={`/${sectionName.toLowerCase()}`}>
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
        <div
          className="z-10"
          onMouseEnter={() => setCursorType("hover")}
          onMouseLeave={() => setCursorType("pointer")}
        >
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
          <img
            src={photo}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default function MainMenu({ goToMainMenu }: MainMenuProps) {
  const [hoveredSection, setHoveredSection] = useState<string>();

  return (
    <div
      className={`${
        !goToMainMenu && "pointer-events-none" // if we're not yet on the mainMenu, the pointer events are deactivated
      } fixed z-20 h-screen w-screen flex flex-col md:flex-row`}
      id="Menu"
    >
      <MenuSection
        start={goToMainMenu}
        photo="https://virgile-portfollio.s3.amazonaws.com/photos/girl_portrait.png"
        sectionName="Videos"
        hoveredSection={hoveredSection}
        setHoveredSection={setHoveredSection}
        custom={-2}
      />
      <MenuSection
        start={goToMainMenu}
        photo="https://virgile-portfollio.s3.amazonaws.com/photos/hands_holding.png"
        sectionName="Photos"
        hoveredSection={hoveredSection}
        setHoveredSection={setHoveredSection}
        custom={2}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: goToMainMenu ? 1 : 0 }}
        transition={{ ease, delay: goToMainMenu ? 1.4 : 0 }}
        className="absolute bottom-0 left-0 w-screen text-xs flex justify-between pb-3 px-4 sm:px-6 xl:text-sm"
      >
        <p>@VirgileHasselmann</p>
        <p>2022</p>
      </motion.div>
    </div>
  );
}
