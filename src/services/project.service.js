import customAxios from "./axios.service";

import { GET_ALL_PROJECTS_URL } from "./api-endpoints";

class ProjectService {
  async getAllProjects() {
    try {
      const response = await customAxios.get(GET_ALL_PROJECTS_URL);
      return Promise.resolve(response.data);
    } catch (err) {
      return Promise.reject(err.response);
    }
  }
}

export default new ProjectService();
