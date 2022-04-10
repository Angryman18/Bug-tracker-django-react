import customAxios from "./axios.service";
import { USER_SPECEIFIC_BUGS } from "./api-endpoints";

class ManageService {
  async getUserBugs() {
    try {
      const response = await customAxios.post(USER_SPECEIFIC_BUGS, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      return err?.response?.data;
    }
  }
}

export default new ManageService();
