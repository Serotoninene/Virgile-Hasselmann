import React from "react";
// Framer motion
import { Photo_Category } from "@prisma/client";

interface Props {
  photoIdx: number;
  photosLength: number;
  isOverview: boolean;
  setIsOverview: (e: boolean) => void;
  filters: Photo_Category[];
  category: string;
  setCategory: (e: Photo_Category) => void;
}

const PhotosFooter = ({
  photoIdx,
  photosLength,
  isOverview,
  setIsOverview,
  filters,
  category,
  setCategory,
}: Props) => {
  return (
    <div className="pt-2 pb-1 flex justify-between text-sm 2xl:text-base">
      <p className="hidden sm:block font-light">Made by @Serotoninene, 2022</p>
      <p className="block font-light sm:hidden">
        {photoIdx + 1} / {photosLength}
      </p>
      <ul className="flex">
        <li
          className={`${
            isOverview ? "font-bold" : "font-light"
          } ml-14 hover:font-bold `}
          onClick={() => setIsOverview(!isOverview)}
        >
          Overview
        </li>
        <li className="hidden sm:block ml-14 font-light">Categories : </li>
        {filters.map((filter) => (
          <li
            key={filter.id}
            className={`ml-14 sm:block ${
              filter.name === category ? "font-bold" : "font-light"
            }`}
            onClick={() => setCategory(filter)}
          >
            {filter.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhotosFooter;
