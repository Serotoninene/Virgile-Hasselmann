import { Video } from "@prisma/client";
import { photoLink } from "@src/contexts/store";
import { useEffect, useState } from "react";

type Props = {
  videos: Video[];
};

export const useLoader = ({ videos }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const loadAssets = async () => {
    const videosNotSecret = videos.filter((video) => video.isSecret === false);
    const urls = videosNotSecret.map(
      (video) => photoLink + "/" + video.placeholder_hq
    );

    try {
      const images = urls.map((url) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => {
            setProgress((prev) => prev + 1);
            resolve();
          };
          img.onerror = () => {
            setProgress((prev) => prev + 1);
            resolve();
          };
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

  const loadingProgress = Math.round((progress / videos?.length) * 100);

  return { isLoading, loadingProgress };
};
