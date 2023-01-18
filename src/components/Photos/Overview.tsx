import React, { useEffect, useState } from "react";
import Image from "next/image";
// Server
import { Photo } from "@prisma/client";
// Framer motion
import { motion } from "framer-motion";
// Components
import useWindowSize from "@src/hooks/useWindowSize";

const photoLink = "https://virgile-portfollio.s3.amazonaws.com/photos/";

// Types
interface Props {
  photos: Photo[];
  isOverview: boolean;
  displayedPhotoIdx: number;
  setDisplayedPhotoIdx: (e: number) => void;
}
interface MiniatureProps {
  photo: Photo;
  idx: number;
  imgWidth: number;
  imgHeight: number;
  displayedPhotoIdx: number;
  setDisplayedPhotoIdx: (e: number) => void;
}
// Anim transition
const transition = { duration: 0.4, ease: [0.3, 0.01, -0.05, 0.95] };

const Miniature = ({
  idx,
  photo,
  displayedPhotoIdx,
  setDisplayedPhotoIdx,
}: MiniatureProps) => {
  // Adding leading zero to to the idx
  const octalIdx = (idx + 1).toString().padStart(2, "0");

  const changePhotoDisplayed = () => {
    setDisplayedPhotoIdx(idx);
  };

  return (
    <div onClick={changePhotoDisplayed} className="mb-4">
      <div className="w-[13vw] h-[20vw] relative">
        <Image
          alt={photo.photoName}
          src={photoLink + photo.photoName}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <p
        className={`mt-3 font-bold text-xs leading-[2px] 2xl:text-sm 2xl:leading-[4px] ${
          displayedPhotoIdx === idx && "text-blue"
        }`}
      >
        {octalIdx}
      </p>
    </div>
  );
};

export default function Overview({
  photos,
  isOverview,
  displayedPhotoIdx,
  setDisplayedPhotoIdx,
}: Props) {
  const { width } = useWindowSize();
  const [imgWidth, setImgWidth] = useState<number>(111);
  const [imgHeight, setImgHeight] = useState<number>(158);

  // making it bigger on larger screens
  useEffect(() => {
    if (width && width > 1536) {
      setImgWidth(150);
      setImgHeight(220);
    } else {
      setImgWidth(111);
      setImgHeight(158);
    }
  }, [width]);

  return (
    <motion.div
      animate={{ x: isOverview ? "-100%" : 0, transition }}
      className={`w-[${imgWidth}px] h-full absolute left-full top-0 overflow-scroll`}
    >
      {photos.map((p, idx) => (
        <Miniature
          key={p.id}
          idx={idx}
          photo={p}
          imgWidth={imgWidth}
          imgHeight={imgHeight}
          displayedPhotoIdx={displayedPhotoIdx}
          setDisplayedPhotoIdx={setDisplayedPhotoIdx}
        />
      ))}
    </motion.div>
  );
}
