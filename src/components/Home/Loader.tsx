import React from "react";
import AnimatedLetters from "../Utils/AnimatedLetters";

type Props = {
  loadingProgress: number;
};

const Loader = ({ loadingProgress }: Props) => {
  console.log(loadingProgress);
  return (
    <div className="h-[calc(var(--vh)*100)] flex justify-center items-center">
      <div className="w-[305px] sm:w-[420px] xl:[33vw]">
        <div className="h-[1px] w-full bg-light" />
        <div className="flex justify-between mt-3">
          <AnimatedLetters string="Virgile Hasselmann" />

          <AnimatedLetters string={loadingProgress.toString()} />
        </div>
      </div>
    </div>
  );
};

export default Loader;
