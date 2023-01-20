import React, { useEffect, useState } from "react";
import Image from "next/image";
// Type
import { Photo } from "@prisma/client";
import { photoLink } from "@src/contexts/store";

interface Props {
  photos: Photo[];
}

function PhotosLoader({ photos }: Props) {
  const [loaded, setLoaded] = useState(0);
  const [errored, setErrored] = useState(0);

  const handleLoad = () => {
    setLoaded((prev) => prev + 1);
  };

  const handleError = () => {
    setErrored((prev) => prev + 1);
  };

  const percentage = ((loaded / (loaded + errored)) * 100).toFixed(2);

  useEffect(() => {
    window.localStorage.setItem("loadState", percentage);
    console.log(window.localStorage.getItem("loadState"));
  }, [loaded, errored, percentage]);

  return (
    <div className="absolute opacity-70 w-full h-screen z-10">
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
