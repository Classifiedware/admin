import apiClient from "./api.client.service";
import { API_URL_ADMIN_AUTH_CHECK } from "@/api.const";

export class AuthCheckApiService {
  async authCheck() {
    const authToken = localStorage.getItem("accessToken") || '';

    return await apiClient.get(`${API_URL_ADMIN_AUTH_CHECK}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then(() => {
      return true;
    }).catch(() => {
      return false;
    })
  }
}
