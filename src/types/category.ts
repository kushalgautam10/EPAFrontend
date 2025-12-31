import { BaseResponse } from "./BaseResponse";

export interface Category extends BaseResponse {
  id: number;
  name?: string;
  description?: string;
}
export interface CategoryFormValues {
  name: string;
  description?: string;
}