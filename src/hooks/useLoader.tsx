import { Video } from "@prisma/client";
import { photoLink } from "@src/contexts/store";
import { useEffect, useState } from "react";

type Props = {
  videos: Video[];
};

export const useLoader = ({ videos }: Props) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const videosNotSecret = videos?.filter((video) => video.isSecret === false);

  const loadAssets = async () => {
    const urls = videosNotSecret.map(
      (video) => photoLink + "/" + video.placeholder_hq
    );

    try {
      const images = urls.map((url) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = () => {
            setProgress((prev) => prev + 1);
            resolve();
          };
          img.onerror = () => {
            reject();
          };
        });
      });

      Promise.all(images)
        .then(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 1500);
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

  const loadingProgress = Math.round(
    (progress / videosNotSecret?.length) * 100
  );

  return { isLoading, loadingProgress };
};
