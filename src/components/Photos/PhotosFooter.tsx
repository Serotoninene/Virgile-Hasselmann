import React from "react";
// Framer motion
import { Photo_Category } from "@prisma/client";

interface Props {
  displayedPhotoIdx: number;
  photosLength?: number;
  isOverview: boolean;
  setIsOverview: (e: boolean) => void;
}

const PhotosFooter = ({
  displayedPhotoIdx,
  photosLength,
  isOverview,
  setIsOverview,
}: Props) => {
  return (
    <div className="pt-2 pb-1 flex justify-between z-10 text-sm 2xl:text-base">
      <p className="block font-light">
        {displayedPhotoIdx + 1} / {photosLength}
      </p>
      <ul className="flex">
        <li
          className={`${
            isOverview ? "font-bold" : "font-light"
          } ml-14 cursor-pointer hover:font-bold `}
          onClick={() => setIsOverview(!isOverview)}
        >
          Overview
        </li>
      </ul>
    </div>
  );
};

export default PhotosFooter;
