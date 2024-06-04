export interface Params {
  page: number;
  pageSize: number;
  paramName: string;
  paramValue: string | number | boolean;
}

export interface PaginationResponse<T> {
  page: number;
  totalCount: number;
  data: T[];
}
