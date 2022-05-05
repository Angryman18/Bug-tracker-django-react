import customAxios from "./axios.service";

import {
  GET_ALL_PROJECTS_URL,
  SEARCHED_PROJECT,
  ADD_PROJECT,
  ADD_COMMENTS,
  GET_PROJECT_COMMENT,
  ADD_LIKE,
} from "./api-endpoints";

class ProjectService {
  async getAllProjects() {
    try {
      const response = await customAxios.get(GET_ALL_PROJECTS_URL);
      return Promise.resolve(response.data);
    } catch (err) {
      return Promise.reject(err.response);
    }
  }

  async getProjectPage(Obj) {
    try {
      const response = await customAxios.post(GET_ALL_PROJECTS_URL, Obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      return Promise.reject(err.reponse.data);
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

  async addProject(Obj) {
    try {
      const response = await customAxios.post(ADD_PROJECT, Obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  }

  async addComment(Obj) {
    try {
      const response = await customAxios.post(ADD_COMMENTS, Obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  }

  async getAllProjectComment(id) {
    try {
      const response = await customAxios.get(`${GET_PROJECT_COMMENT}/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  }

  async addLike(Obj) {
    try {
      const response = await customAxios.post(ADD_LIKE, Obj, {
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

export default new ProjectService();
