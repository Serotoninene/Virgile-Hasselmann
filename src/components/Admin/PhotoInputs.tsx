import React, { FormEvent, useEffect, useRef, useState } from "react";
// Api
import { trpc } from "@server/utils/trpc";
import { uploadImage } from "@src/pages/api/upload-image";
// Types
import { Photo } from "@prisma/client";
import { PhotoIcon } from "@heroicons/react/24/solid";
// Components
import Button from "../Utils/Button";

type Props = {
  data?: Photo;
};

export default function PhotoInputs({ data }: Props) {
  const [photo, setPhoto] = useState<File>();
  const [isDragOver, setIsDragOver] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });

  const fileUploadRef = useRef() as React.RefObject<HTMLInputElement>;

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setPhoto(file);
    const fileInput = fileUploadRef.current;
    if (fileInput && e.dataTransfer.files.length > 0) {
      (fileInput as HTMLInputElement).files = e.dataTransfer.files;
    }
    setIsDragOver(false);
  };

  // trpc api routes
  const createPhoto = trpc.photo.create.useMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!photo) return;

    setStatus({
      type: "LOADING",
      message: "Upload en cours. Peut prendre plusieurs minutes.",
    });

    await uploadImage(photo);
    createPhoto.mutate({
      photoName: photo.name,
    });
    setPhoto(undefined);
  };

  useEffect(() => {
    if (!status.type || status.type === "LOADING") return;
    const timeout = setTimeout(() => {
      setStatus({ message: "", type: "" });
    }, 2500);

    return () => clearTimeout(timeout);
  }, [status]);

  useEffect(() => {
    if (createPhoto.isSuccess || createPhoto.isError) {
      setStatus(
        createPhoto.error
          ? { type: "ERROR", message: createPhoto.error.toString() }
          : { type: "SUCCESS", message: "Photo ajoutée" }
      );
    }
  }, [createPhoto.isSuccess, createPhoto.isError]);

  return (
    <form className="mb-16 py-8" onSubmit={handleSubmit}>
      <div
        className={`mt-2 flex justify-center rounded-lg border px-6 py-10 ${
          isDragOver ? "border-blue/75" : "border-gray-900/25 border-dashed"
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
      >
        <div className="text-center">
          <PhotoIcon
            className="mx-auto h-12 w-12 text-gray-300"
            aria-hidden="true"
          />
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span className="px-3">Upload a file</span>{" "}
              <input
                ref={fileUploadRef}
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={(e) => setPhoto(e.currentTarget.files![0])}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            {!photo?.name ? "PNG, JPG, GIF" : photo.name}
          </p>
        </div>
      </div>
      <Button className="mt-6" onClick={handleSubmit}>
        {" "}
        Submit
      </Button>
      {status.message && <div>{status.message}</div>}
    </form>
  );
}
