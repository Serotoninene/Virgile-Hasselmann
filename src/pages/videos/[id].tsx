import { useState } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
// Server
import { Video } from "@prisma/client";
import { prisma } from "@server/prisma";
import { trpc } from "@server/utils/trpc";
// Framer motion
import { motion } from "framer-motion";

interface Props {}

const VideoPlayer = () => {
  const { query } = useRouter();
  const id = Number(query.id);
  // const queryVideo = trpc.video.byId.useQuery(BigInt(810418995343785986));

  return (
    <motion.div className="h-screen w-screen bg-slate-300 z-20">
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
