import React, { FormEvent, useEffect, useRef, useState } from "react";
// Api
import { trpc } from "@server/utils/trpc";
import { uploadImage } from "@src/pages/api/upload-image";
import { uploadVideo } from "@src/pages/api/upload-video";
// Types
import { Video } from "@prisma/client";

import { PhotoIcon } from "@heroicons/react/24/solid";
import Button from "../Utils/Button";

interface Props {
  data?: Video;
}

const VideoInputs = ({ data }: Props) => {
  // inputs
  const [title, setTitle] = useState<string>(data ? data.title : "");
  const [isDragOver, setIsDragOver] = useState(false);

  const [dateOfCreation, setDateOfCreation] = useState<Date>(
    data ? data.dateOfCreation : new Date("2023-01-01")
  );
  const fileUploadRef = useRef() as React.RefObject<HTMLInputElement>;

  const [video, setVideo] = useState<File>();
  const [placeholder_hq, setPlaceholder_hq] = useState<File>();

  const [status, setStatus] = useState({ message: "", type: "" });

  const [isSecret, setIsSecret] = useState<boolean>(false);

  // trpc  API routes
  const createVideo = trpc.video.create.useMutation();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setVideo(file);
    const fileInput = fileUploadRef.current;
    if (fileInput && e.dataTransfer.files.length > 0) {
      (fileInput as HTMLInputElement).files = e.dataTransfer.files;
    }
    setIsDragOver(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!placeholder_hq || !video) return;
    setStatus({
      type: "LOADING",
      message: "Upload en cours. Peut prendre plusieurs minutes.",
    });

    await uploadImage(placeholder_hq);
    await uploadVideo(video);

    createVideo.mutate({
      title,
      dateOfCreation,
      videoName: video.name,
      placeholder_hq: placeholder_hq.name,
      isSecret,
    });
    setTitle("");
    setVideo(undefined);
    setPlaceholder_hq(undefined);
    setIsSecret(false);
  };

  useEffect(() => {
    if (!status.type || status.type === "LOADING") return;
    const timeout = setTimeout(() => {
      setStatus({ message: "", type: "" });
    }, 2500);

    return () => clearTimeout(timeout);
  }, [status]);

  useEffect(() => {
    if (createVideo.isSuccess || createVideo.isError) {
      setStatus(
        createVideo.error
          ? { type: "ERROR", message: createVideo.error.toString() }
          : { type: "SUCCESS", message: " Vidéo enregistrée " }
      );
    }
  }, [createVideo.isSuccess, createVideo.isError]);

  return (
    <form
      onSubmit={handleSubmit}
      className="my-10 grid grid-cols-1 gap-y-4 gap-x-8 sm:grid-cols-3"
    >
      <div>
        <label
          htmlFor="title"
          className="block font-medium leading-6 text-gray-900"
        >
          Titre de la photo
        </label>
        <div className="mt-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <input
              type="text"
              name="title"
              id="title"
              autoComplete="title"
              className="block flex-1 border-0 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-base sm:leading-6"
              placeholder="Titre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="photo"
          className="block font-medium leading-6 text-gray-900"
        >
          Photo de la vignette
        </label>
        <div className="mt-2 flex items-center gap-x-3">
          <input
            id="placeholder"
            type="file"
            className="p-2 bg-transparent rounded outline-none border border-gray-500 text-gray-500 cursor-pointer"
            onChange={(e) => setPlaceholder_hq(e.currentTarget.files![0])}
            placeholder="Placeholder HQ"
          />
        </div>
      </div>

      <div className="titleContainer">
        <label htmlFor="date">Date of Creation</label>
        <input
          id="date"
          type="date"
          className="block mt-2 py-2 px-3 bg-transparent drop-shadow cursor-pointer rounded outline-none border border-gray-900  focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
          value={dateOfCreation.toISOString().split("T")[0]}
          onChange={(e) => setDateOfCreation(new Date(e.target.value))}
        />
      </div>

      <div className="col-span-full">
        <label
          htmlFor="cover-photo"
          className="block font-medium leading-6 text-gray-900"
        >
          Vidéo
        </label>
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
                  onChange={(e) => setVideo(e.currentTarget.files![0])}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              {!video?.name ? "The video here " : video.name}
            </p>
          </div>
        </div>
      </div>
      <div className="placeholderContainer flex items-center gap-4">
        <label htmlFor="secret"> Secret ? </label>
        <input
          type="checkbox"
          id="secret"
          checked={isSecret}
          onChange={(e) => setIsSecret(e.target.checked)}
        />
      </div>

      <div className="flex justify-center">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
      {status.message && <div>{status.message}</div>}
    </form>
  );
};

export default VideoInputs;
