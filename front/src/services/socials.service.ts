import { $api } from './axios.service';

export class SocialsService {
  static getAll() {
    return $api.get('/socials');
  }
}
