import axios from "axios";

const BASE_URL = process.env.BASE_URL;
const AUTH_LOGIN = BASE_URL + "user/login";

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
}

export default new AuthService();
