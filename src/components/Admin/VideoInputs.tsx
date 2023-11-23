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

interface Fields {
  label: string;
  type: string;
  placeholder?: string;
  customClass?: string;
  required?: boolean;
  name:
    | "title"
    | "placeholder_hq"
    | "videoLink"
    | "dateOfCreation"
    | "isSecret";
}

const fields: Fields[] = [
  {
    label: "Titre de la photo",
    type: "text",
    placeholder: "Titre",
    name: "title",
    required: true,
  },
  {
    label: "Photo de la vignette",
    type: "file",
    placeholder: "Placeholder HQ",
    name: "placeholder_hq",
    required: true,
  },
  {
    label: "Lien Youtube",
    type: "text",
    placeholder: "Lien Youtube",
    name: "videoLink",
    required: true,
  },
  {
    label: "Date of Creation",
    type: "date",
    name: "dateOfCreation",
    required: true,
  },
  {
    label: "Secret ?",
    type: "checkbox",
    name: "isSecret",
    customClass: "w-6 h-6",
  },
];

const VideoInputs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VideoInputsProps>();
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
      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="block font-medium leading-6 text-gray-900"
          >
            {field.label}
          </label>
          <div className="mt-2">
            <div
              className={`flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md ${field.customClass}`}
            >
              <input
                className="block flex-1 border-0 bg-transparent py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-base sm:leading-6"
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.name, {
                  required: field.required ? "Ce champ est requis" : false,
                })}
              />
            </div>
            {errors[field.name] && (
              <p className="text-red-500">{errors[field.name]?.message}</p>
            )}
          </div>
        </div>
      ))}

      <div className="flex justify-center">
        <Button>Submit</Button>
      </div>
      {status.message && <div>{status.message}</div>}
    </form>
  );
};

export default VideoInputs;
