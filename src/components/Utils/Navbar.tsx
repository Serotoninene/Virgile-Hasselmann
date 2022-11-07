import React, { useEffect, useRef, useState } from "react";
// Nextjs
import { useRouter } from "next/router";
// framer motion
import { motion, useInView } from "framer-motion";
// Components
import CustomLink from "./CustomLink";

const links = [
  { title: "Videos", href: "/videos" },
  { title: "Photos", href: "/photos" },
  { title: "Contact", href: "/contact" },
];

const containerAnim = {
  hidden: {},
  shown: {
    transition: {
      staggerChildren: 0.02,
      delayChildren: 1.1,
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

export default function Navbar() {
  const ref = useRef(null);
  const { pathname } = useRouter();
  const inView = useInView(ref, { margin: "1000px" });

  useEffect(() => {
    console.log(inView);
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      variants={containerAnim}
      initial="hidden"
      animate="shown"
      exit="hidden"
      className="flex justify-between py-2 px-4 sm:py-4 sm:px-6"
    >
      <motion.div variants={itemsAnim} className="font-icon">
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
    </motion.div>
  );
}
