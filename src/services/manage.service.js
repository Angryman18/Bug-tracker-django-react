import customAxios from "./axios.service";
import {
  USER_SPECEIFIC_BUGS,
  GET_USER_SPECEFIC_CONTENTS,
  UPDATE_BUG_STATUS,
} from "./api-endpoints";

class ManageService {
  async getUserSpeceficContent() {
    try {
      const response = await customAxios.post(GET_USER_SPECEFIC_CONTENTS, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response?.data;
    } catch (err) {
      return err?.response?.data;
    }
  }

  async updateBugStatus(Obj) {
    try {
      const response = await customAxios.post(UPDATE_BUG_STATUS, Obj, {
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

export default new ManageService();
