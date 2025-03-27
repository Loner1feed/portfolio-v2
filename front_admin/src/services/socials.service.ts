import { PaginationParams } from "../utils/types/items.types";
import { Social } from "../utils/types/socials.types";
import $api from "./axios.service";

export class SocialsService {
  static getAll() {
    return $api.get("/socials");
  }

  static getById(id: string) {
    return $api.get(`/socials/${id}/`);
  }

  static getByPage(params: PaginationParams) {
    return $api.post("/socials", params);
  }

  static update(id: string, data: Social) {
    return $api.put(`/socials/${id}/`, data);
  }

  static create(data: Social) {
    return $api.post("/socials/create", data);
  }

  static delete(id: string) {
    return $api.delete(`/socials/${id}/`);
  }
}
