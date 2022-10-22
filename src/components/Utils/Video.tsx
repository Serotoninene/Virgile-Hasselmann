import React, { Suspense } from "react";
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
};

const Placeholder = ({ placeholder, priority = false }: PlaceholderProps) => {
  return (
    <div className="w-full h-full">
      <Image
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
  return (
    <>
      <Suspense
        fallback={<Placeholder placeholder={placeholder} priority={priority} />}
      >
        <video
          preload="metadata"
          loop
          autoPlay
          muted
          className={`w-full h-full object-cover`}
        >
          <source src={src} type={`video/${type}`} />
        </video>
      </Suspense>
    </>
  );
}
