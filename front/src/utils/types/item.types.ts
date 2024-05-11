export interface Item extends ShortItem {
  description: string;
  websiteUrl: string;
  repoUrl: string;
  stack: string[];
  imagePublicId?: string;
}

export interface ShortItem {
  title: string;
  id: string;
  imageUrl: string;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  paramName: string;
  paramValue: string | number | boolean;
}

export interface PaginationResponse {
  page: number;
  totalCount: number;
  data: ShortItem[];
}
