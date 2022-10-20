import React, { useState } from "react";
// framer motion
import { motion } from "framer-motion";

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
    transition: { ease, duration },
  },
};

export default function MainMenu() {
  const [hoveredSection, setHoveredSection] = useState<string>();

  return (
    <div className="h-screen w-screen flex fixed z-20" id="Menu">
      {/* Container for the image and the linkButton */}
      <motion.div
        custom={-2}
        variants={anim}
        initial="invisible"
        animate="visible"
        // style={{
        //   filter: hoveredSection === "photos" ? "grayscale(1)" : "grayscale(0)",
        // }}
        className="h-full w-3/6 relative overflow-hidden flex justify-center items-center"
        onHoverStart={() => setHoveredSection("videos")}
      >
        {/* LinkButton */}
        <div className="z-10">
          <h2 className="text-3xl font-light">Videos</h2>
        </div>
        {/* Container for image, needs to be absolute so I can center properly the linkButton + allow the dezooming effect on launch */}
        <motion.div
          variants={photoAnim}
          initial="invisible"
          animate="visible"
          whileHover="hover"
          className=" absolute top-0 left-0 w-full"
        >
          <img
            src="/assets/photos/girl_portrait.png"
            className="w-full object-cover object-center"
          />
        </motion.div>
      </motion.div>
      {/* Container for the image and the linkButton */}
      <motion.div
        custom={2}
        variants={anim}
        initial="invisible"
        animate="visible"
        // style={{
        //   filter: hoveredSection === "videos" ? "grayscale(1)" : "grayscale(0)",
        // }}
        onHoverStart={() => setHoveredSection("photos")}
        className="h-full w-3/6 relative overflow-hidden  flex justify-center items-center"
      >
        {/* LinkButton */}
        <div className="z-10">
          <h2 className="text-3xl font-light">Photos</h2>
        </div>
        {/* Container for image, needs to be absolute so I can center properly the linkButton + allow the dezooming effect on launch */}
        <motion.div
          variants={photoAnim}
          initial="invisible"
          animate="visible"
          whileHover="hover"
          className="h-full absolute top-0 left-0 w-full"
        >
          <img
            src="/assets/photos/hands_holding.png"
            className="h-full object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
