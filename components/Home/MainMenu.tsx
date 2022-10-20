import React, { useState } from "react";
// framer motion
import { motion } from "framer-motion";

interface MenuSectionProps {
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
    transition: { ease, duration },
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
    scale: 1.3,
    transition: { ease, duration: 0.1 },
  },
};

const MenuSection = ({
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
      animate="visible"
      // style={{
      //   filter:
      //     hoveredSection !== sectionName ? "grayscale(1)" : "grayscale(0)",
      // }}
      className="h-full w-3/6 relative overflow-hidden flex justify-center items-center"
      onHoverStart={() => setHoveredSection(sectionName)}
    >
      {/* LinkButton */}
      <div className="z-10">
        <h2 className="text-3xl font-light">{sectionName}</h2>
      </div>
      {/* Container for image, needs to be absolute so I can center properly the linkButton + allow the dezooming effect on launch */}
      <motion.div
        variants={photoAnim}
        initial="invisible"
        animate="visible"
        whileHover="hover"
        className=" absolute top-0 left-0 w-full h-full"
      >
        <img src={photo} className="w-full h-full object-cover object-center" />
      </motion.div>
    </motion.div>
  );
};

export default function MainMenu() {
  const [hoveredSection, setHoveredSection] = useState<string>();

  return (
    <div className="h-screen w-screen flex fixed z-20" id="Menu">
      <MenuSection
        photo="/assets/photos/girl_portrait.png"
        sectionName="Vidéos"
        hoveredSection={hoveredSection}
        setHoveredSection={setHoveredSection}
        custom={-2}
      />
      <MenuSection
        photo="/assets/photos/hands_holding.png"
        sectionName="Photos"
        hoveredSection={hoveredSection}
        setHoveredSection={setHoveredSection}
        custom={2}
      />
    </div>
  );
}
