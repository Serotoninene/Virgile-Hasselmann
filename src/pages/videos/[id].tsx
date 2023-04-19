import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
// Server
import { Video } from "@prisma/client";
import { trpc } from "@server/utils/trpc";
// Framer motion
import { motion } from "framer-motion";

const ClosingTag = () => {
  return (
    <Link href="/">
      <div className="absolute top-6 left-6 flex cursor-pointer z-50 pointer-events-auto h-6">
        <div className="w-6 h-[2px] bg-light rotate-45 translate-y-[6px]"></div>
        <div className="w-6 h-[2px] bg-light -rotate-45 -translate-x-[24px]  translate-y-[6px]"></div>
      </div>
    </Link>
  );
};

const VideoPlayer = () => {
  const { query } = useRouter();
  const videoData = query.id && trpc.video.byId.useQuery(query.id as string);
  const [video, setVideo] = useState<Video | null | undefined>(null);

  useEffect(() => {
    videoData && setVideo(videoData.data);
  }, [videoData]);

  return (
    <motion.div className="h-screen w-screen relative">
      <ClosingTag />
      {video && (
        <video
          preload="metadata"
          autoPlay
          controls
          onLoadedData={() => {
            console.log("finish loading ?");
          }}
          controlsList="nodownload nofullscreen noremoteplayback"
          className={`w-full h-full object-cover`}
        >
          <source
            src={`https://virgile-portfollio.s3.amazonaws.com/videos/${video.videoName}`}
            type={`video/mp4`}
          />
        </video>
      )}
    </motion.div>
  );
};

export default VideoPlayer;
