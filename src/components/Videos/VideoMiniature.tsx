import React, { RefObject, useContext, useRef } from "react";
import Image from "next/image";
// Framer motion
import { motion, MotionValue, useScroll, useSpring } from "framer-motion";
// Hooks
import useParallax from "@src/hooks/useParallax";
import { AuthContext } from "@src/contexts/AuthProvider";
import { trpc } from "@server/utils/trpc";
import { Video } from "@prisma/client";
import Link from "next/link";

interface VideoMiniatureProps {
  data: Video;
  scrollYProgress: MotionValue<number>;
}

const duration = 0.7;
const ease = [0.6, 0.01, -0.05, 0.95];

const containerAnim = {
  hidden: {},
  visible: { transition: { delayChildren: 0.6, staggerChildren: 0.4 } },
};

const photoAnim = {
  hidden: { y: "-100%", transition: { duration: 0.4, ease } },
  visible: { y: 0, transition: { duration, ease } },
};

const textAnim = {
  hidden: { opacity: 0, transition: { duration, ease } },
  visible: { opacity: 1, transition: { duration, ease } },
};

const VideoMiniature = ({ data, scrollYProgress }: VideoMiniatureProps) => {
  // Parallax animation
  let distance = 10;
  const ref = useRef() as RefObject<HTMLDivElement>;
  // const { scrollYProgress } = useScroll({ target: ref, smooth: 0.5 });
  const y = useParallax(scrollYProgress, distance, "full");
  const physics = { damping: 15, mass: 1, stiffness: 55 };
  const springY = useSpring(y, physics);

  // delete video if userStatus = anim
  const { userStatus } = useContext(AuthContext);
  const deleteVideo = trpc.video.delete.useMutation();

  const handleDeletingVideo = (e: string) => {
    deleteVideo.mutate(data.id);
  };

  return (
    <Link href={`/videos/${data.id}`}>
      <motion.div
        ref={ref}
        variants={containerAnim}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="overflow-hidden"
      >
        <motion.div className="overflow-hidden" variants={photoAnim}>
          <motion.div
            className="relative h-[184px] sm:h-[336px]"
            style={{ y: springY, scale: 1.5 }}
          >
            <Image
              src={`https://virgile-portfollio.s3.amazonaws.com/photos/${data.placeholder_hq}`}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </motion.div>
        </motion.div>
        <motion.div
          variants={textAnim}
          className="grid grid-cols-12 px-1 pt-2 text-sm"
        >
          <p className="col-span-4">08/09/2021</p>
          <p className="col-span-4 xs:col-span-5">Client</p>
          {userStatus === "ADMIN" ? (
            <div className="col-span-4 flex justify-between xs:col-span-3">
              <p>{data.title}</p>
              <p onClick={() => handleDeletingVideo(data.id)}>X</p>
            </div>
          ) : (
            <p className="col-span-4 xs:col-span-3">{data.title}</p>
          )}
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default VideoMiniature;
