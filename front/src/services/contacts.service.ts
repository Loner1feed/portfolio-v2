import { $api } from './axios.service';

export class ContactsService {
  static getAll() {
    return $api.get('/contacts');
  }
}
