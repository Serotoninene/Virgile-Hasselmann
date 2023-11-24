import { Video } from "@prisma/client";
import { photoLink } from "@src/contexts/store";
import { useEffect, useState } from "react";

type Props = {
  videos: Video[];
};

export const useLoader = ({ videos }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const loadAssets = async () => {
    const videosNotSecret = videos.filter((video) => video.isSecret === false);
    const urls = videosNotSecret.map(
      (video) => photoLink + "/" + video.placeholder_hq
    );

    try {
      const images = urls.map((url) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      Promise.all(images)
        .then(() => {
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadAssets();
  }, []);

  return isLoading;
};
