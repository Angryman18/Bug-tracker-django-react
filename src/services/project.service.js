import customAxios from "./axios.service";

import { GET_ALL_PROJECTS_URL, SEARCHED_PROJECT } from "./api-endpoints";

class ProjectService {
  async getAllProjects() {
    try {
      const response = await customAxios.get(GET_ALL_PROJECTS_URL);
      return Promise.resolve(response.data);
    } catch (err) {
      return Promise.reject(err.response);
    }
  }

  async getSearchedProject(Obj) {
    try {
      const response = await customAxios.post(SEARCHED_PROJECT, Obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      Promise.reject(err.response.data);
    }
  }
}

export default new ProjectService();
