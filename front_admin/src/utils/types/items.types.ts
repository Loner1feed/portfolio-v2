import { Key } from "react";

export interface Item extends ShortItem {
  description: string;
  websiteUrl: string;
  repoUrl: string;
  stack: string[];
  imagePublicId?: string;
  isSimple: boolean;
}

export interface ShortItem {
  title: string;
  _id: string;
  imageUrl: string;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  paramName: string;
  paramValue: string | number | boolean | Key | bigint;
}

export interface PaginationResponse {
  page: number;
  totalCount: number;
  data: ShortItem[];
}

export interface FormDataTypes {
  [key: string]: any;
}
