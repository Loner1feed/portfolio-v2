import { $api, PaginationParams } from './axios.service';

export class ItemsService {
  static getItemsByPage(params: PaginationParams) {
    return $api.post('/items', params);
  }

  static getItem(id: string) {
    return $api.get('/items', { params: id });
  }

  static sendItem(data: unknown) {
    return $api.put('/items/66226aec71e79f9f420d2c47', data);
  }
}
