import { PaginationParams } from 'utils/types/item.types';
import { $api } from './axios.service';

export class ItemsService {
  static getItemsByPage(params: PaginationParams) {
    return $api.post('/items', params);
  }

  static getItem(id: string) {
    // console.log(id);
    return $api.get(`/items/single?id=${id}`);
  }
}
