import React from "react";
import Image from "next/image";

export default function PhotosBanner() {
  return (
    <div className="flex justify-center items-center h-[60vh] relative">
      <div className="flex ">
        <div className="w-1/6 h-1/6 ">
          <Image
            src="https://virgile-portfollio.s3.amazonaws.com/photos/girl_portrait.png"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col justify-center relative">
          <p className="text-center"> Photos</p>
          <div className="w-2/6 h-1/6 ">
            <Image
              src="https://virgile-portfollio.s3.amazonaws.com/photos/hands_holding.png"
              layout="fill"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
