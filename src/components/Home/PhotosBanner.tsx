import React, { RefObject, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
// Framer motion
import { motion, useInView } from "framer-motion";
// Components
import AnimatedLetters from "../Utils/AnimatedLetters";
import { photoLink } from "@src/contexts/store";

// Anim variants
const duration = 0.5;
const ease = [0.6, 0.01, -0.05, 0.95];

const containerAnim = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};
const photoAnim = {
  hidden: { opacity: 0, transition: { duration, ease } },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: [0.73, 0.15, 0.31, 0.94] },
  },
};

export default function PhotosBanner() {
  const ref = useRef() as RefObject<HTMLDivElement>;
  const isInView = useInView(ref, { margin: "10%" });
  return (
    <div
      ref={ref}
      className="flex justify-center items-center h-[70vh] snap-child-start"
    >
      <motion.div
        variants={containerAnim}
        initial="hidden"
        whileInView="visible"
        className="grid sm:grid-cols-5 sm:gap-4 w-3/6 h-4/6"
      >
        <div className="hidden sm:block h-full col-span-2 relative ">
          <motion.div variants={photoAnim}>
            <Link href="/photos">
              <Image
                className="cursor-pointer"
                src="/assets/girl_portrait.webp"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </Link>
          </motion.div>
        </div>
        <div className="w-full col-span-3 flex flex-col justify-center sm:justify-end ">
          <Link href="/photos">
            <a className="font-extrabold text-2xl sm:text-3xl xl:text-[48px] 2xl:text-[64px]x">
              <AnimatedLetters string="Photos" start={isInView} />
            </a>
          </Link>
          <div className="h-2/3 relative overflow-hidden">
            <motion.div variants={photoAnim}>
              <Link href="/photos">
                <Image
                  className="cursor-pointer"
                  src={`${photoLink}/3.jpg`}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
