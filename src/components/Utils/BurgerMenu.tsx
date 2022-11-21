import React from "react";
//framer motion
import { motion } from "framer-motion";

interface Link {
  title: string;
  href: string;
}

interface Props {
  links: Link[];
  isBurgerOpen: boolean;
}

export default function BurgerMenu({ links, isBurgerOpen }: Props) {
  return (
    <motion.div className="fixed top-0 left-full bg-dark h-screen w-screen xs:hidden">
      BurgerMenu
    </motion.div>
  );
}
