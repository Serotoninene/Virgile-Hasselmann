import React from "react";
// Component
import AnimatedLetters from "@src/components/Utils/AnimatedLetters";
import { motion } from "framer-motion";

interface FiltersProps {
  filterSelected: string;
  setFilterSelected: (e: string) => void;
}

const filterLinks = ["Films", "Corporate", "Musique"];

const Filters = ({ filterSelected, setFilterSelected }: FiltersProps) => {
  return (
    <div className="flex text-2xl sm:justify-center sm:text-5xl">
      <ul className="flex">
        {filterLinks.map((filter, idx) => (
          <div key={filter} className="flex">
            <li
              onClick={() => setFilterSelected(filter)}
              className={`${
                filterSelected === filter ? "text-blue font-black" : ""
              } mx-1`}
            >
              <AnimatedLetters
                string={filter}
                delay={0.1 * idx}
                stagger={0.01}
              />
            </li>
            {idx !== filterLinks.length - 1 && (
              <motion.li
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 1, ease: "easeOut" },
                }}
              >
                /
              </motion.li>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Filters;
