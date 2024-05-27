import { FormDataTypes, PaginationParams } from "../utils/types/items.types";
import $api from "./axios.service";

export class ItemsService {
  static getItemsByPage(params: PaginationParams) {
    return $api.post("/items/full", params);
  }

  static getItem(id: string) {
    return $api.get(`/items/single?id=${id}`);
  }

  static updateItem(data: FormDataTypes, id: string) {
    return $api.put(`/items/${id}/`, data);
  }

  static createItem(data: FormDataTypes) {
    return $api.post("/items/create", data);
  }

  static deleteItem(id: string) {
    return $api.delete(`/items/${id}/`);
  }
}
