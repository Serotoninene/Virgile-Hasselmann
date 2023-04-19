import React, { Suspense, useState } from "react";
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
  console.log(isLoading);
  return (
    <>
      <Placeholder
        placeholder={placeholder}
        priority={priority}
        isLoading={isLoading}
      />
      <video
        preload="metadata"
        loop
        autoPlay
        muted
        onLoadedData={() => setIsLoading(false)}
        className={`w-full h-full object-cover`}
      >
        <source src={src} type={`video/${type}`} />
      </video>
    </>
  );
}
