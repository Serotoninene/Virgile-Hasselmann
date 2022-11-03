import React, { useEffect, useState } from "react";
// Framer motion
import { AnimatePresence, motion } from "framer-motion";
import { trpc } from "@server/utils/trpc";
import Image from "next/image";
import { Photo } from "@prisma/client";
import useWindowSize from "@src/hooks/useWindowSize";

const videoLink = "https://virgile-portfollio.s3.amazonaws.com/photos/";

export default function photos() {
  const { width } = useWindowSize();
  const photosData: Photo[] | undefined = trpc.photo.list.useQuery().data;
  const filters = trpc.photoCat.list.useQuery().data;
  if (!photosData || !filters) return <>Loading</>; // while the data's loading, returns loading hihi

  const [isOverview, setIsOverview] = useState(false); // if overview's true -> shows the overview nav bar (to be made)
  const [category, setCategory] = useState(filters[0].name); // manage the category selected, for now : "Artistiques" and "Professionnelles"

  const [photoIdx, setPhotoIdx] = useState(0);
  const [photoDisplayed, setPhotoDisplayed] = useState(
    photosData[photoIdx].photoName
  );

  const handleClick = () => {
    if (photoIdx < photosData.length - 1) {
      setPhotoIdx(photoIdx + 1);
    } else {
      setPhotoIdx(0);
    }
  };

  useEffect(() => {
    setPhotoDisplayed(photosData[photoIdx].photoName);
  }, [photoIdx]);

  return (
    <div
      className="h-screen pt-12 px-2 flex flex-col justify-between relative sm:px-6"
      onClick={handleClick}
    >
      <div className="absolute opacity-0 h-0 overflow-hidden"></div>
      <div className="h-full relative overflow-hidden flex items-start sm:items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={photoDisplayed}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full min-h-[70vh] sm:w-full sm:h-full"
          >
            <Image
              src={videoLink + photoDisplayed}
              layout="fill"
              objectFit={width! < 640 ? "cover" : "contain"}
              objectPosition="left"
              placeholder="blur"
              blurDataURL={videoLink + photoDisplayed}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="pt-2 pb-1 flex justify-between text-sm 2xl:text-base">
        <p className="font-light">Made by @Serotoninene, 2022</p>
        <ul className="flex">
          <li
            className={`${
              isOverview ? "font-bold" : "font-light"
            } ml-14 hover:font-bold `}
            onClick={() => setIsOverview(!isOverview)}
          >
            Overview
          </li>
          <li className="ml-14 font-light">Categories : </li>
          {filters.map((filter) => (
            <li
              key={filter.id}
              className={`ml-14 ${
                filter.name === category ? "font-bold" : "font-light"
              }`}
              onClick={() => setCategory(filter.name)}
            >
              {filter.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
