import customAxios from "./axios.service";

import { EDIT_PROFILE } from "./api-endpoints";

class ProfileService {
  async updateUserProfile(Obj) {
    try {
      const response = await customAxios.put(EDIT_PROFILE, Obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("response", response);
      return response.data;
    } catch (err) {
      Promise.reject(err?.response?.data);
    }
  }
}

export default new ProfileService();
