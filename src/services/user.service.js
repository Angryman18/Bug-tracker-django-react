import axios from "axios";
import customAxios from "./axios.service";

import {
  GET_USER_INFO,
  GET_USER_DETAILS,
  GET_ALL_USERS,
} from "./api-endpoints";

class UserService {
  async getUserInfo(Obj) {
    try {
      const respone = await axios.post(GET_USER_INFO, Obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return respone.data;
    } catch (err) {
      return err.respone;
    }
  }

  async getUserDetails(Obj) {
    try {
      const response = await customAxios.post(GET_USER_DETAILS, Obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      return Promise.reject(err.response);
    }
  }

  async getAllUsers() {
    try {
      const response = await customAxios(GET_ALL_USERS, {
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

export default new UserService();
