export interface Fields {
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
