import React, { useEffect, useState } from "react";
// Api
import { trpc } from "@server/utils/trpc";
import { uploadImage } from "@src/pages/api/upload-image";
// React-hook-form
import { useForm } from "react-hook-form";
// Types
import Button from "../../Utils/Button";
import { VideoInputsProps } from "types";
import { fields, updateFields } from "./fields";
import { Video } from "@prisma/client";
import { deleteImage } from "@src/pages/api/delete-image";

type Props = {
  video?: Video;
};

const VideoInputs = ({ video }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VideoInputsProps>();
  const [status, setStatus] = useState({ type: "", message: "" });

  // trpc  API routes
  const createVideoMutation = trpc.video.create.useMutation();
  const updateVideoMutation = trpc.video.update.useMutation();

  const handleSubmitCreateVideo = async (formData: VideoInputsProps) => {
    if (!formData.placeholder_hq?.[0]) return;
    setStatus({ type: "LOADING", message: "Upload en cours" });

    await uploadImage(formData.placeholder_hq[0]);

    createVideoMutation.mutate(
      {
        title: formData.title,
        dateOfCreation: new Date(formData.dateOfCreation),
        placeholder_hq: formData.placeholder_hq[0].name,
        videoLink: formData.videoLink,
        isSecret: formData.isSecret,
      },
      {
        onSuccess: () => {
          window.location.reload();
        },
        onError: (error) => {
          setStatus({ type: "ERROR", message: error.toString() });
        },
      }
    );
  };

  const handleUpdateVideoMutation = async (formData: VideoInputsProps) => {
    setStatus({ type: "LOADING", message: "Upload en cours" });

    if (formData.placeholder_hq?.[0]) {
      await deleteImage(video!.placeholder_hq);
      await uploadImage(formData.placeholder_hq[0]);
    }

    updateVideoMutation.mutate(
      {
        id: video!.id,
        title: formData.title,
        dateOfCreation: new Date(formData.dateOfCreation),
        placeholder_hq: formData.placeholder_hq?.[0].name,
        videoLink: formData.videoLink || "",
        isSecret: formData.isSecret,
      },
      {
        onSuccess: () => {
          window.location.reload();
        },
        onError: (error) => {
          setStatus({ type: "ERROR", message: error.toString() });
        },
      }
    );
  };

  const onSubmit = (formData: VideoInputsProps) => {
    if (video) {
      handleUpdateVideoMutation(formData);
    } else {
      handleSubmitCreateVideo(formData);
    }
  };

  useEffect(() => {
    if (!status.type || status.type === "LOADING") return;
    const timeout = setTimeout(() => {
      setStatus({ message: "", type: "" });
    }, 2500);

    return () => clearTimeout(timeout);
  }, [status]);

  useEffect(() => {
    if (createVideoMutation.isSuccess || createVideoMutation.isError) {
      setStatus(
        createVideoMutation.error
          ? { type: "ERROR", message: createVideoMutation.error.toString() }
          : { type: "SUCCESS", message: " Vidéo enregistrée " }
      );
    }
  }, [createVideoMutation.isSuccess, createVideoMutation.isError]);

  // setting the values of the form if we are updating a video
  useEffect(() => {
    if (video) {
      setValue("title", video.title);
      setValue("dateOfCreation", new Date(video.dateOfCreation));
      setValue("videoLink", video.videoLink || "");
      setValue("isSecret", video.isSecret || false);

      fetch(process.env.NEXT_PUBLIC_PHOTOS + video.placeholder_hq)
        .then((response) => response.blob())
        .then((blob) => {
          const file = new File([blob], video.placeholder_hq, {
            type: blob.type,
          });
          setValue("placeholder_hq", [file]);
        });
    }
  }, [video]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative my-10 flex flex-col items-center mx-auto "
    >
      <div className="relative w-full sm:w-auto">
        {(video ? updateFields : fields).map((field) => (
          <div key={field.name} className="mb-4">
            <label
              htmlFor={field.name}
              className="block font-medium leading-6 text-gray-900"
            >
              {field.label}
            </label>
            <div className="mt-2">
              <div
                className={`flex rounded-md shadow-sm ring-1 ring-in
                set ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ${field.customClass}`}
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

        <div className="absolute bottom-4 right-0 text-dark">
          <Button>Submit</Button>
        </div>
      </div>

      {status.message && <div>{status.message}</div>}
    </form>
  );
};

export default VideoInputs;
