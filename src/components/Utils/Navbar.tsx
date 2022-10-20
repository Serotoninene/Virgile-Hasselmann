import React, { useEffect, useState } from "react";
// Nextjs
import Link from "next/link";
import { useRouter } from "next/router";
// framer motion
import { motion } from "framer-motion";

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
      delayChildren: 1.4,
    },
  },
};

const itemsAnim = {
  hidden: { y: -50, opacity: 0 },
  shown: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.3, 0.01, -0.05, 0.95] },
  },
};

export default function Navbar() {
  const { pathname } = useRouter();
  const [isLinks, setIsLinks] = useState<boolean>(false);

  // the NavLinks are invisible when you're on the homepage
  useEffect(() => {
    pathname === "/" ? setIsLinks(false) : setIsLinks(true);
  }, [pathname]);

  return (
    <motion.div
      variants={containerAnim}
      initial="hidden"
      animate="shown"
      exit="hidden"
      className="flex justify-between py-2 px-4 sm:py-4 sm:px-6"
    >
      <motion.div variants={itemsAnim} className="font-icon">
        <Link href="/">VH</Link>
      </motion.div>
      <ul className="hidden xs:flex">
        {isLinks &&
          links.map((link, idx) => (
            <motion.li
              key={idx}
              variants={itemsAnim}
              className={`ml-14 text-lg hover:font-bold ${
                pathname === link.href ? "font-bold" : "font-light"
              }`}
            >
              <Link href={link.href}>{link.title}</Link>
            </motion.li>
          ))}
      </ul>
    </motion.div>
  );
}
