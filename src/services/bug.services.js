import customAxios from "./axios.service";

import {
  GET_BUGS_URL,
  FILTER_BUG_DATEWISE,
  ADD_BUG_URL,
} from "./api-endpoints";

class BugService {
  async getAllBugs() {
    try {
      const response = await customAxios.get(GET_BUGS_URL);
      return response;
    } catch (err) {
      return err.response;
    }
  }

  async getFilteredBugs(Obj) {
    try {
      const response = await customAxios.post(FILTER_BUG_DATEWISE, Obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return Promise.resolve(response);
    } catch (err) {
      return Promise.reject(err.response);
    }
  }

  async addBug(Obj) {
    try {
      const response = await customAxios.post(ADD_BUG_URL, Obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      return Promise.reject(err.response);
    }
  }
}

export default new BugService();
