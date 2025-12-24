import { baseApi } from "./baseApi";
import { BasePaginatedResponse } from "../types/BaseResponse";
import { Category } from "../types/category";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<
      BasePaginatedResponse<Category>,
      { pageNumber: number; pageSize: number }>
      ({
        
      query: ({ pageNumber, pageSize }) =>
        `/v1/category?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      providesTags: ["Category"],
    }),

    // CREATE
    createCategory: builder.mutation<Category, Partial<Category>>({
      
      query: (body) => ({
        url: "/v1/category",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Category"],
    }),

    // UPDATE
    updateCategory: builder.mutation<Category,Partial<Category>>
    ({
      query: (body ) => ({
        url: `/v1/category`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Category"],
    }),

    // DELETE
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `/v1/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;