import axios from "axios";

import { AUTH_LOGIN, AUTH_SIGNUP } from "./api-endpoints";

class AuthService {
  async Login(Obj) {
    try {
      const response = await axios.post(AUTH_LOGIN, Obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      return err;
    }
  }

  async Signup(Obj) {
    try {
      const response = await axios.post(AUTH_SIGNUP, Obj, {
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

export default new AuthService();
