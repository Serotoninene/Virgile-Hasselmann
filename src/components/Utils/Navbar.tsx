import React, { useState } from "react";
// framer motion
import { motion } from "framer-motion";
// Components
import CustomLink from "./CustomLink";
import BurgerMenu from "./BurgerMenu";

// Types
interface Props {
  isNavVisible: boolean;
  pathname: string;
}
interface BurgerButtonProps {
  isBurgerOpen: boolean;
}
// Navlinks
const links = [
  { title: "Videos", href: "/" },
  { title: "Photos", href: "/photos" },
  { title: "Contact", href: "/contact" },
];
// Framer motion variants
const containerAnim = {
  hidden: {},
  shown: {
    transition: {
      staggerChildren: 0.02,
    },
  },
};
const itemsAnim = {
  hidden: { y: -50, opacity: 0 },
  shown: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.3, 0.01, -0.05, 0.95] },
  },
};

const BurgerButton = ({ isBurgerOpen }: BurgerButtonProps) => {
  const burgerButtonAnim = {
    open: { rotate: 0, y: 0 },
    close: (custom: number) => ({
      y: custom * 3,
      rotate: custom * 45,
    }),
  };
  return (
    <>
      <motion.div
        custom={1}
        variants={burgerButtonAnim}
        animate={isBurgerOpen ? "close" : "open"}
        className="w-6 h-[2px] mt-1 bg-light"
      ></motion.div>
      <motion.div
        custom={-1}
        variants={burgerButtonAnim}
        animate={isBurgerOpen ? "close" : "open"}
        className="w-6 h-[2px] mt-1 bg-light"
      ></motion.div>
    </>
  );
};

export default function Navbar({ isNavVisible, pathname }: Props) {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };
  return (
    <motion.div
      variants={containerAnim}
      initial="hidden"
      animate={isNavVisible ? "shown" : "hidden"}
      exit="hidden"
      className="flex justify-between py-2 px-4 sm:py-4 sm:px-6"
    >
      <motion.div variants={itemsAnim} className="font-icon z-10">
        <CustomLink href="/">VH</CustomLink>
      </motion.div>
      <ul className="hidden xs:flex">
        {links.map((link, idx) => (
          <motion.li
            key={idx}
            variants={itemsAnim}
            className={`ml-14 text-lg hover:font-bold ${
              pathname === link.href ? "font-bold" : "font-light"
            }`}
          >
            <CustomLink href={link.href}>{link.title}</CustomLink>
          </motion.li>
        ))}
      </ul>
      <div className="block z-10 mt-1 xs:hidden" onClick={toggleBurgerMenu}>
        <BurgerButton isBurgerOpen={isBurgerOpen} />
      </div>
      <BurgerMenu isBurgerOpen={isBurgerOpen} links={links} />
    </motion.div>
  );
}
