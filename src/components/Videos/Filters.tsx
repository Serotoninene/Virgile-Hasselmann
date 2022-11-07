import React from "react";
// framer motion
import { motion } from "framer-motion";
// Component
import AnimatedLetters from "@src/components/Utils/AnimatedLetters";
import { Vid_Category } from "@prisma/client";

interface FiltersProps {
  filters: Vid_Category[];
  filterSelected?: string;
  setFilterSelected: (e: string) => void;
}

const Filters = ({
  filters,
  filterSelected,
  setFilterSelected,
}: FiltersProps) => {
  if (!filters) return <></>;

  return (
    <div className="flex text-2xl sm:justify-center sm:text-5xl">
      <ul className="flex">
        {filters.map((filter, idx) => (
          <div key={filter.name} className="flex">
            <li
              onClick={() => setFilterSelected(filter.id)}
              className={`${
                filterSelected === filter.id ? "text-blue font-black" : ""
              } mx-1 cursor-pointer`}
            >
              <AnimatedLetters
                string={filter.name}
                delay={0.1 * idx}
                stagger={0.01}
              />
            </li>
            {idx !== filters.length - 1 && (
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
