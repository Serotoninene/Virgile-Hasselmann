import React from "react";

export default function DarkGradients() {
  return (
    <div
      id="DARK_GRADIENTS"
      className="h-[100.1vh] w-screen absolute top-0 flex flex-col justify-between pointer-events-none z-10"
    >
      <div className="h-[25vh] xs:h-[20vh] bg-gradient-to-b from-darkOpaque to-transparent"></div>
      <div className="h-[60vh] xs:h-[33vh] bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
}
