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

const Miniature = ({
  idx,
  photo,
  imgWidth,
  imgHeight,
  displayedPhotoIdx,
  setDisplayedPhotoIdx,
}: MiniatureProps) => {
  // Adding leading zero to to the idx
  const octalIdx = (idx + 1).toString().padStart(2, "0");

  const changePhotoDisplayed = () => {
    setDisplayedPhotoIdx(idx);
  };

  return (
    <div className="mb-3" onClick={changePhotoDisplayed}>
      <Image
        src={photoLink + photo.photoName}
        width={imgWidth}
        height={imgHeight}
        objectFit="cover"
      />
      <p
        className={`font-bold text-xs leading-[2px] 2xl:text-sm 2xl:leading-[4px] ${
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

  // variants
  const containerAnim = {
    hidden: {
      x: "100%",
    },
    visible: {
      x: 0,
    },
  };

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
      animate={{ x: isOverview ? "-100%" : 0 }}
      transition={{ ease: "easeInOut", duration: 0.2 }}
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
