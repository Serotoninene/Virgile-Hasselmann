import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// Server
import { Video } from "@prisma/client";
import { trpc } from "@server/utils/trpc";
// Framer motion
import { motion } from "framer-motion";

const VideoPlayer = () => {
  const { query } = useRouter();
  const videoData = query.id && trpc.video.byId.useQuery(query.id as string);
  const [video, setVideo] = useState<Video | null | undefined>(null);

  useEffect(() => {
    videoData && setVideo(videoData.data);
  }, [videoData]);

  return (
    <motion.div className="h-screen w-screen z-20 relative">
      {video && (
        <video
          preload="metadata"
          controls
          controlsList="nodownload nofullscreen noremoteplayback"
          className={`w-full h-full object-cover border`}
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
