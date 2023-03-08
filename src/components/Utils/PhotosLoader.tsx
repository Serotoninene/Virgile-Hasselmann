import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
// Type
import { Photo, Video } from "@prisma/client";
import { photoLink } from "@src/contexts/store";
import {
  IsLoadedContext,
  LoadingContext,
} from "@src/contexts/IsLoadedProvider";

interface Props {
  photos: Photo[];
  videos: Video[];
}

function PhotosLoader({ photos, videos }: Props) {
  const photosOnlyOnHome = [
    "/assets/girl_portrait.webp",
    "https://virgile-portfollio.s3.amazonaws.com/photos/3.jpg",
    "/assets/hands_praying.png",
  ];
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

  useEffect(() => {
    const percentage =
      ((loaded + errored) / (photos.length + videos.length + 3)) * 100;
    setLoadingState(percentage.toFixed(0));
    if (percentage === 100) {
      setTimeout(() => setIsLoaded(true), 1500);
    }
  }, [loaded, errored]);

  return (
    <div className="absolute opacity-0 w-full h-screen z-10">
      {photos.map((photo) => (
        <Image
          key={photo.id}
          alt=""
          src={photoLink + photo.photoName}
          layout="fill"
          onLoad={handleLoad}
          onError={handleError}
        />
      ))}
      {/* Photos only on the home */}
      {photosOnlyOnHome.map((photo, idx) => (
        <Image
          key={idx}
          alt=""
          src={photo}
          layout="fill"
          onLoad={handleLoad}
          onError={handleError}
        />
      ))}
      {videos.map((video) => (
        <Image
          key={video.id}
          alt=""
          src={photoLink + video.placeholder_hq}
          layout="fill"
          onLoad={handleLoad}
          onError={handleError}
        />
      ))}
    </div>
  );
}

export default PhotosLoader;
