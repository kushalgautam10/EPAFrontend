import * as yup from "yup";
import {CategoryFormValues } from "../../../types/category";

export const categorySchema: yup.ObjectSchema<CategoryFormValues> =
  yup.object({
    name: yup
      .string()
      .required("Category name is required")
      .min(3, "Minimum 3 characters"),
    description: yup
    .string()
    .required("Description is required")
    .min(3, "Minimum 3 characters")
    .max(500, "Maximum 3 characters"),
  });