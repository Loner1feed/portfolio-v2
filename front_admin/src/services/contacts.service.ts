import { Contact } from "../utils/types/contacts.types";
import { PaginationParams } from "../utils/types/items.types";
import $api from "./axios.service";

export class ContactsService {
  static getContacts() {
    return $api.get("/contacts");
  }

  static getContactById(id: string) {
    return $api.get(`/contacts/${id}/`);
  }

  static getContactsByPage(params: PaginationParams) {
    return $api.post("/contacts", params);
  }

  static updateContact(data: Contact, id: string) {
    return $api.put(`/contacts/${id}/`, data);
  }

  static createContact(data: Contact) {
    return $api.post("/contacts/create", data);
  }

  static deleteItem(id: string) {
    return $api.delete(`/contacts/${id}/`);
  }
}
