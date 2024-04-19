import axios from 'axios';

export interface PaginationParams {
  page: number;
  pageSize: number;
  paramName: string;
  paramValue: string | number | boolean;
}

export const $api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
