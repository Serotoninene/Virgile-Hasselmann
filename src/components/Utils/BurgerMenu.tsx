import React from "react";
import Link from "next/link";
//framer motion
import { motion } from "framer-motion";
import AnimatedLetters from "./AnimatedLetters";
import Image from "next/image";
import { useRouter } from "next/router";

interface UniqueLink {
  title: string;
  href: string;
}
interface Props {
  links: UniqueLink[];
  isBurgerOpen: boolean;
  setIsBurgerOpen: (e: boolean) => void;
}

const ease = [0.6, 0.01, -0.05, 0.95];
const containerAnim = {
  closed: {
    x: 0,
    transition: { ease },
  },
  open: {
    x: "-100%",
    transition: { ease },
  },
};

export default function BurgerMenu({
  links,
  isBurgerOpen,
  setIsBurgerOpen,
}: Props) {
  const router = useRouter();

  return (
    <motion.div
      id="BurgerMenu"
      variants={containerAnim}
      animate={isBurgerOpen ? "open" : "closed"}
      className="fixed top-0 py-2 px-4 left-full bg-dark h-screen w-screen flex items-end xs:hidden"
    >
      <div className="absolute w-full h-full left-0 top-0">
        <Image alt="background" src="/assets/burgerBg.png" layout="fill" />
      </div>
      <ul className="z-10 pb-4">
        {links.map((link, idx) => (
          <li
            key={link.href}
            className="cursor-pointer text-[64px] sm:text-[80px]"
            onClick={() => {
              setIsBurgerOpen(false);
              router.push(link.href);
            }}
          >
            <AnimatedLetters
              string={link.title}
              start={isBurgerOpen}
              delay={idx * 0.2}
              fontWeight="font-black"
            />
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
