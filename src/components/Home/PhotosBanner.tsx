import Image from "next/image";
import React from "react";

export default function PhotosBanner() {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="flex">
        <div className="w-1/6">
          <Image
            src="https://virgile-portfollio.s3.amazonaws.com/photos/girl_portrait.png"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-center"> Photos</p>
          <div className="w-2/6">
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
