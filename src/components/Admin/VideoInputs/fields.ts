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

export const updateFields: Fields[] = [
  {
    label: "Nouveau titre",
    type: "text",
    placeholder: "Titre",
    name: "title",
  },
  {
    label: "Nouvelle vignette",
    type: "file",
    placeholder: "Placeholder HQ",
    name: "placeholder_hq",
  },
  {
    label: "Lien Youtube",
    type: "text",
    placeholder: "Lien Youtube",
    name: "videoLink",
  },
  {
    label: "Nouvelle Date",
    type: "date",
    name: "dateOfCreation",
  },
  {
    label: "Secret ?",
    type: "checkbox",
    name: "isSecret",
    customClass: "w-6 h-6",
  },
];
