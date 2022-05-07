import customAxios from "./axios.service";

import { EDIT_PROFILE } from "./api-endpoints";

class ProfileService {
  async updateUserProfile(Obj) {
    try {
      const response = await customAxios.post(EDIT_PROFILE, Obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  }
}

export default new ProfileService();
