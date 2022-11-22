import { Photo } from "@prisma/client";
import useWindowSize from "@src/hooks/useWindowSize";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Props {
  photos: Photo[];
}

const photoLink = "https://virgile-portfollio.s3.amazonaws.com/photos/";

export default function Overview({ photos }: Props) {
  const [imgWidth, setImgWidth] = useState<number>(111);
  const [imgHeight, setImgHeight] = useState<number>(158);

  return (
    <div className="absolute w-[111px] height-screen overflow-scroll right-0">
      {photos.map((p) => (
        <Image
          src={photoLink + photos[0].photoName}
          width={imgWidth}
          height={imgHeight}
          objectFit="cover"
        />
      ))}
    </div>
  );
}
