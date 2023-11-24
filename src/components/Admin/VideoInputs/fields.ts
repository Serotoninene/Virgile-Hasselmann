import { Fields } from "./types";

export const fields: Fields[] = [
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
