export interface BaseResponse {
  statusCode: number;
  succeeded: boolean;
  message: string | null;
  errors: string[] | null;
}

export interface BasePaginatedResponse<T> extends BaseResponse {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  data: T[];
}