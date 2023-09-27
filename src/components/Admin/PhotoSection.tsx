import { Photo } from "@prisma/client";
import React from "react";
import { Miniature } from "@components/Photos/Overview";
import PhotoInputs from "./PhotoInputs";
import Image from "next/image";
import { trpc } from "@server/utils/trpc";
import { photoLink } from "@src/contexts/store";

interface Props {
  photos: Photo[];
}

export default function PhotoSection({ photos }: Props) {
  const deletePhoto = trpc.photo.delete.useMutation();

  const handleDeletePhoto = (p: Photo) => {
    deletePhoto.mutate(p.id);
  };

  return (
    <div className="">
      <PhotoInputs />
      <div className="flex flex-wrap gap-4">
        {photos.map((p, idx) => (
          <div key={p.id}>
            <div className="w-[13vw] h-[20vw] relative cursor-pointer">
              <Image
                alt={p.photoName}
                src={`${photoLink}/${p.photoName}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <button onClick={() => handleDeletePhoto(p)}>Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
}
