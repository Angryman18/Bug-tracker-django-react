import axios from "axios";

const BASE_URL = process.env.BASE_URL;

const GET_USER_INFO = BASE_URL + "findUser";

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
}

export default new UserService();