import React, { useEffect, useState } from "react";
// framer motion
import { motion } from "framer-motion";
// Components
import CustomLink from "../CustomLink";
import BurgerMenu from "../BurgerMenu";
import { useRouter } from "next/router";
import { useAuthContext } from "@src/contexts/AuthProvider";
import useWindowSize from "@src/hooks/useWindowSize";
import { containerAnim, itemsAnim } from "./animations";

interface BurgerButtonProps {
  isBurgerOpen: boolean;
}
// Navlinks
const links = [
  { title: "Videos", href: "/#Videos", anchor: "#Videos" },
  { title: "Photos", href: "/photos" },
  { title: "Contact", href: "/#Contact", anchor: "#Contact" },
];

const BurgerButton = ({ isBurgerOpen }: BurgerButtonProps) => {
  const burgerButtonAnim = {
    open: { rotate: 0, y: 0 },
    close: (custom: number) => ({
      y: custom * 3,
      rotate: custom * 45,
      ease: [0.3, 0.01, -0.05, 0.95],
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

export default function Navbar() {
  const { pathname } = useRouter();
  const { userStatus } = useAuthContext();
  const { width } = useWindowSize();

  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  const scrollToSection = (
    e: React.MouseEvent<HTMLLIElement, globalThis.MouseEvent>,
    anchor?: string
  ) => {
    e.preventDefault();
    if (!anchor) return;
    const section = document.querySelector(anchor);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  // Triggered on on wheel event
  const toggleNav = (e: WheelEvent) => {
    // if on mobile, the navbar is always visible
    if (width && width < 640) return;

    if (e.deltaY < 0) {
      setIsNavVisible(true); // if wheel back up => shows the navbar
    } else {
      setIsNavVisible(false);
    }
  };

  useEffect(() => {
    // Add the event listener when the component mounts
    window.addEventListener("wheel", toggleNav);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("wheel", toggleNav);
    };
  }, []); // Empty dependen

  useEffect(() => {
    // hide the navbar if on the video/[id] page
    if (pathname === "/videos/[id]") {
      setIsNavVisible(false);
    }
  }, [pathname]);

  useEffect(() => {
    // if on mobile, the navbar is always visible
    if ((width && width < 640) || pathname === "/photos") setIsNavVisible(true);
  }, [width, pathname]);

  return (
    <motion.div
      variants={containerAnim}
      initial="hidden"
      animate={isNavVisible ? "shown" : "hidden"}
      exit="hidden"
      className="flex justify-between py-2 px-4 sm:py-4 sm:px-6"
    >
      <motion.div variants={itemsAnim} className="font-icon z-10">
        {pathname !== "/photos" && <CustomLink href="/">VH</CustomLink>}
      </motion.div>
      <ul className="hidden xs:flex">
        {links.map((link, idx) => (
          <motion.li
            key={idx}
            variants={itemsAnim}
            onClick={(e) => scrollToSection(e, link.anchor)}
            className={`ml-14 text-lg ${
              pathname === "/photos" && link.title === "Photos" ? "hidden" : ""
            }`}
          >
            <CustomLink href={link.href}>{link.title}</CustomLink>
          </motion.li>
        ))}
        {userStatus === "ADMIN" && (
          <motion.li
            key={"admin"}
            variants={itemsAnim}
            className={`ml-14 text-lg ${pathname === "/admin" ? "hidden" : ""}`}
          >
            <CustomLink href="/admin">Admin</CustomLink>
          </motion.li>
        )}
      </ul>
      <div className="block z-10 mt-1 xs:hidden" onClick={toggleBurgerMenu}>
        <BurgerButton isBurgerOpen={isBurgerOpen} />
      </div>
      <BurgerMenu
        isBurgerOpen={isBurgerOpen}
        setIsBurgerOpen={setIsBurgerOpen}
        links={links}
      />
    </motion.div>
  );
}
