import { Photo } from "@prisma/client";
import useWindowSize from "@src/hooks/useWindowSize";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Props {
  photos: Photo[];
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

const photoLink = "https://virgile-portfollio.s3.amazonaws.com/photos/";

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
    <div
      className={`w-[${imgWidth}px] h-full absolute right-0 top-0 overflow-scroll`}
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
    </div>
  );
}
