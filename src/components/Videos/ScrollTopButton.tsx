import React, { useState } from "react";
// Component
import AnimatedLetters from "../Utils/AnimatedLetters";

export default function ScrollTopButton() {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={scrollToTop}
      className="flex flex-col items-center"
    >
      <div className="items-center w-2 xl:w-2.5">
        <img src="/assets/utils/arrow.svg" className="w-full" />
      </div>
      <p className="text-xs mt-1 xl:text-sm xl:mt-2">
        <AnimatedLetters string="to the top" start={isHovered} delay={0} />
      </p>
    </div>
  );
}
