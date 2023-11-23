import React, { FormEvent, useEffect, useRef, useState } from "react";
// Api
import { trpc } from "@server/utils/trpc";
import { uploadImage } from "@src/pages/api/upload-image";
// React-hook-form
import { useForm } from "react-hook-form";
// Types
import { Video } from "@prisma/client";
import Button from "../Utils/Button";
import { VideoInputsProps } from "types";

interface Props {
  data?: Video;
}

const VideoInputs = ({ data }: Props) => {
  const { register, handleSubmit, reset } = useForm<VideoInputsProps>();
  const [status, setStatus] = useState({ type: "", message: "" });

  // trpc  API routes
  const createVideo = trpc.video.create.useMutation();

  const onSubmit = async (formData: VideoInputsProps) => {
    if (!formData.placeholder_hq?.[0]) return;
    setStatus({ type: "LOADING", message: "Upload en cours" });

    await uploadImage(formData.placeholder_hq[0]);

    createVideo.mutate({
      title: formData.title,
      dateOfCreation: new Date(formData.dateOfCreation),
      videoName: formData.title,
      placeholder_hq: formData.placeholder_hq[0].name,
      videoLink: formData.videoLink,
      isSecret: formData.isSecret,
    });

    // reset the formData
    reset();
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
      onSubmit={handleSubmit(onSubmit)}
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
              className="block flex-1 border-0 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-base sm:leading-6"
              type="text"
              placeholder="Titre"
              {...register("title", { required: true })}
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
            className="p-2 bg-transparent rounded outline-none border border-gray-500 text-gray-500 cursor-pointer"
            type="file"
            placeholder="Placeholder HQ"
            {...register("placeholder_hq", { required: true })}
          />
        </div>
      </div>
      <div className="videoLinkContainer">
        <label htmlFor="date">Lien Youtube</label>
        <div className="mt-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <input
              className="block flex-1 border-0 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-base sm:leading-6"
              type="text"
              placeholder="Lien Youtube"
              {...register("videoLink", { required: true })}
            />
          </div>
        </div>
      </div>

      <div className="titleContainer col-start-2">
        <label htmlFor="date">Date of Creation</label>
        <input
          className="block mt-2 py-2 px-3 bg-transparent drop-shadow cursor-pointer rounded outline-none border border-gray-900  focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
          type="date"
          {...register("dateOfCreation", { required: true })}
        />
      </div>

      <div className="placeholderContainer flex items-center gap-4">
        <label htmlFor="secret"> Secret ? </label>
        <input type="checkbox" {...register("isSecret")} />
      </div>

      <div className="flex justify-center">
        <Button>Submit</Button>
      </div>
      {status.message && <div>{status.message}</div>}
    </form>
  );
};

export default VideoInputs;
