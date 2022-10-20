import React, { Suspense } from "react";
import Image from "next/image";

type Props = {
  src: string;
  placeholder: string;
  type: string;
};

type PlaceholderProps = {
  placeholder: string;
};

const Placeholder = (props: PlaceholderProps) => {
  const { placeholder } = props;
  return (
    <div className="w-full h-full">
      <Image
        src={placeholder}
        layout="fill"
        objectFit="cover"
        placeholder="blur"
        blurDataURL={placeholder}
      />
    </div>
  );
};

export default function Video(props: Props) {
  const { src, type, placeholder } = props;

  return (
    <>
      <Suspense fallback={<Placeholder placeholder={placeholder} />}>
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
