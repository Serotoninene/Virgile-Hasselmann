import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
// Type
import { Photo } from "@prisma/client";
import { photoLink } from "@src/contexts/store";
import {
  IsLoadedContext,
  LoadingContext,
} from "@src/contexts/IsLoadedProvider";

interface Props {
  photos: Photo[];
}

function PhotosLoader({ photos }: Props) {
  const [loaded, setLoaded] = useState(0);
  const [errored, setErrored] = useState(0);
  const { setIsLoaded } = useContext(IsLoadedContext);
  const { setLoadingState } = useContext(LoadingContext);

  const handleLoad = () => {
    setLoaded((prev) => prev + 1);
  };

  const handleError = () => {
    setErrored((prev) => prev + 1);
  };

  const percentage = ((loaded + errored) / photos.length) * 100;
  setLoadingState(percentage.toFixed(0));

  if (percentage === 100) {
    setIsLoaded(true);
  }

  return (
    <div className="absolute opacity-0 w-full h-screen z-10">
      {photos.map((photo, idx) => (
        <Image
          key={idx}
          alt=""
          src={photoLink + photo.photoName}
          layout="fill"
          onLoad={handleLoad}
          onError={handleError}
        />
      ))}
      <div>{`${percentage}% Loaded`}</div>
    </div>
  );
}

export default PhotosLoader;
