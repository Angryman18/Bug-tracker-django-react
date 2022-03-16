import axios from "axios";

const BASE_URL = process.env.BASE_URL;
const AUTH_LOGIN = BASE_URL + "user/login";
const AUTH_SIGNUP = BASE_URL + "user/signup";

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
