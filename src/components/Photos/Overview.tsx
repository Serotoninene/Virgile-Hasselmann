import { Photo } from "@prisma/client";
import useWindowSize from "@src/hooks/useWindowSize";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Props {
  photos: Photo[];
}

interface MiniatureProps {
  photo: Photo;
  imgWidth: number;
  imgHeight: number;
}

const photoLink = "https://virgile-portfollio.s3.amazonaws.com/photos/";

const Miniature = ({ photo, imgWidth, imgHeight }: MiniatureProps) => {
  return (
    <Image
      src={photoLink + photo.photoName}
      width={imgWidth}
      height={imgHeight}
      objectFit="cover"
    />
  );
};

export default function Overview({ photos }: Props) {
  const [imgWidth, setImgWidth] = useState<number>(111);
  const [imgHeight, setImgHeight] = useState<number>(158);

  return (
    <div className="absolute w-[111px] height-screen right-0">
      {photos.map((p) => (
        <Miniature photo={p} imgWidth={imgWidth} imgHeight={imgHeight} />
      ))}
    </div>
  );
}
