import { motion } from "framer-motion";

interface VideoPlayerProps {
  videoPlayed?: string;
  isVideoPlayed: boolean;
  setIsVideoPlayed: (e: boolean) => void;
}

const anim = {
  hidden: {
    y: "100%",
    transition: { ease: "easeOut" },
  },
  shown: {
    y: 0,
    transition: { ease: [0.3, 0.01, -0.05, 0.95] },
  },
};

const VideoPlayer = ({
  isVideoPlayed,
  setIsVideoPlayed,
  videoPlayed,
}: VideoPlayerProps) => {
  console.log(videoPlayed);
  return (
    <motion.div
      variants={anim}
      initial="hidden"
      animate={isVideoPlayed ? "shown" : "hidden"}
      className="fixed top-0 left-0 h-screen w-screen bg-slate-300 z-20"
      onClick={() => {
        setIsVideoPlayed(false);
      }}
    >
      <video
        preload="metadata"
        loop
        autoPlay
        muted
        className={`w-full h-full object-cover border`}
      >
        <source
          src={`https://virgile-portfollio.s3.amazonaws.com/videos/heroVideo.mp4`}
          type={`video/mp4`}
        />
      </video>
    </motion.div>
  );
};

export default VideoPlayer;
