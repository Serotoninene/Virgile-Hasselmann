import React, { FormEvent, useState } from "react";
// Api
import { trpc } from "@server/utils/trpc";
import { uploadImage } from "@src/pages/api/upload-image";
// Types
import { Photo } from "@prisma/client";

type Props = {
  data?: Photo;
};

export default function PhotoInputs({ data }: Props) {
  const [photo, setPhoto] = useState<File>();

  // trpc api routes
  const createPhoto = trpc.photo.create.useMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!photo) return;

    await uploadImage(photo);
    createPhoto.mutate({
      photoName: photo.name,
    });
  };

  return (
    <form className="mb-16 flex justify-between" onSubmit={handleSubmit}>
      <label htmlFor="photo"> Photo</label>
      <input
        id="photo"
        type="file"
        className="p-1 bg-transparent outline-none border border-light text-light"
        onChange={(e) => setPhoto(e.currentTarget.files![0])}
        placeholder="Name of the data"
      />
      <button className="ml-16 border border-light p-1 rounded-sm">go !</button>
    </form>
  );
}
