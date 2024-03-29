import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  src: string;
  placeholder: string;
  type: string;
  priority?: boolean;
};

type PlaceholderProps = {
  placeholder: string;
  priority?: boolean;
  isLoading?: boolean;
};

const Placeholder = ({
  placeholder,
  priority = false,
  isLoading,
}: PlaceholderProps) => {
  if (!isLoading) return null;

  return (
    <div className="w-full h-full">
      <Image
        alt="placeholder"
        src={placeholder}
        layout="fill"
        objectFit="cover"
        placeholder="blur"
        blurDataURL={placeholder}
        priority={priority}
      />
    </div>
  );
};

export default function Video({
  src,
  type,
  placeholder,
  priority = false,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <motion.div
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <Placeholder
        placeholder={placeholder}
        isLoading={isLoading}
        priority={priority}
      />
      <video
        preload="metadata"
        loop
        autoPlay
        muted
        onLoadedData={() => setIsLoading(false)}
        className="w-full h-full object-cover"
      >
        <source src={src} type={`video/${type}`} />
      </video>
    </motion.div>
  );
}
