import $api from "./axios.service";

export class UsersService {
  static login(params: any) {
    return $api.post("/auth/login", params);
  }
}
