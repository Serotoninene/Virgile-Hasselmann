import React, { useContext } from "react";
// framer motion
import { motion } from "framer-motion";
// Context
import { CursorContext } from "@src/contexts/CursorProvider";
// Component
import AnimatedLetters from "@src/components/Utils/AnimatedLetters";

interface FiltersProps {
  filters: string[];
  filterSelected: string;
  setFilterSelected: (e: string) => void;
}

const Filters = ({
  filters,
  filterSelected,
  setFilterSelected,
}: FiltersProps) => {
  const { changeCursorType } = useContext(CursorContext);

  return (
    <div className="flex text-2xl sm:justify-center sm:text-5xl">
      <ul className="flex">
        {filters.map((filter, idx) => (
          <div key={filter} className="flex">
            <li
              onClick={() => setFilterSelected(filter)}
              onMouseEnter={() => changeCursorType("hover")}
              onMouseLeave={() => changeCursorType("pointer")}
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
