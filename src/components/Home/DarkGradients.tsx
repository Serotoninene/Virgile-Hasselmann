import React from "react";

export default function DarkGradients() {
  return (
    <div className="h-screen w-screen absolute top-0 flex flex-col justify-between pointer-events-none ">
      <div className="h-[25vh] xs:h-[20vh] bg-gradient-to-b from-darkOpaque to-transparent"></div>
      <div className="h-[60vh] xs:h-[33vh] bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
}
