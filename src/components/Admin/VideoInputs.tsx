import React, { FormEvent, useEffect, useRef, useState } from "react";
// Api
import { trpc } from "@server/utils/trpc";
import { uploadImage } from "@src/pages/api/upload-image";
// Types
import { Video } from "@prisma/client";
import Button from "../Utils/Button";
import { VideoInputs } from "types";

interface Props {
  data?: Video;
}

const VideoInputs = ({ data }: Props) => {
  const [formState, setFormState] = useState<VideoInputs>({
    title: data ? data.title : "",
    videoLink: data && data.videoLink ? data.videoLink : "",
    dateOfCreation: data ? data.dateOfCreation : new Date("2023-01-01"),
    placeholder_hq: undefined,
    status: { message: "", type: "" },
    isSecret: false,
  });

  // trpc  API routes
  const createVideo = trpc.video.create.useMutation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    if (files) {
      setFormState((prevFormData) => ({
        ...prevFormData,
        [name]: files[0],
      }));
    } else if (name === "dateOfCreation") {
      setFormState((prevFormData) => ({
        ...prevFormData,
        [name]: new Date(value),
      }));
    } else {
      setFormState((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formState.placeholder_hq) return;
    setFormState((prevState) => ({
      ...prevState,
      status: {
        type: "LOADING",
        message: "Upload en cours. Peut prendre plusieurs minutes.",
      },
    }));

    await uploadImage(formState.placeholder_hq);

    createVideo.mutate({
      title: formState.title,
      dateOfCreation: formState.dateOfCreation,
      videoName: formState.title,
      placeholder_hq: formState.placeholder_hq.name,
      videoLink: formState.videoLink,
      isSecret: formState.isSecret,
    });

    setFormState((prevState) => ({
      ...prevState,
      title: "",
      video: undefined,
      placeholder_hq: undefined,
      videoLink: "",
      isSecret: false,
    }));
  };

  useEffect(() => {
    if (!formState.status.type || formState.status.type === "LOADING") return;
    const timeout = setTimeout(() => {
      setFormState((prevState) => ({
        ...prevState,
        status: { message: "", type: "" },
      }));
    }, 2500);

    return () => clearTimeout(timeout);
  }, [formState.status]);

  useEffect(() => {
    if (createVideo.isSuccess || createVideo.isError) {
      setFormState((prevState) => ({
        ...prevState,
        status: createVideo.error
          ? { type: "ERROR", message: createVideo.error.toString() }
          : { type: "SUCCESS", message: " Vidéo enregistrée " },
      }));
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
              aria-invalid={true}
              type="text"
              name="title"
              id="title"
              autoComplete="title"
              className="block flex-1 border-0 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-base sm:leading-6"
              placeholder="Titre"
              value={formState.title}
              onChange={handleChange}
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
            name="placeholder_hq"
            type="file"
            className="p-2 bg-transparent rounded outline-none border border-gray-500 text-gray-500 cursor-pointer"
            onChange={handleChange}
            placeholder="Placeholder HQ"
          />
        </div>
      </div>
      <div className="videoLinkContainer">
        <label htmlFor="date">Lien Youtube</label>
        <div className="mt-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <input
              type="text"
              name="videoLink"
              id="videoLink"
              className="block flex-1 border-0 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-base sm:leading-6"
              placeholder="Lien Youtube"
              value={formState.videoLink}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="titleContainer col-start-2">
        <label htmlFor="date">Date of Creation</label>
        <input
          id="date"
          type="date"
          name="dateOfCreation"
          className="block mt-2 py-2 px-3 bg-transparent drop-shadow cursor-pointer rounded outline-none border border-gray-900  focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
          value={formState.dateOfCreation.toISOString().split("T")[0]}
          onChange={handleChange}
        />
      </div>

      <div className="placeholderContainer flex items-center gap-4">
        <label htmlFor="secret"> Secret ? </label>
        <input
          type="checkbox"
          id="secret"
          checked={formState.isSecret}
          onChange={(e) =>
            setFormState((prevState) => ({
              ...prevState,
              isSecret: e.target.checked,
            }))
          }
        />
      </div>

      <div className="flex justify-center">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
      {formState.status.message && <div>{formState.status.message}</div>}
    </form>
  );
};

export default VideoInputs;
