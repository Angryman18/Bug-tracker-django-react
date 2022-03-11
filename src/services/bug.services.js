import axios from "axios";

const BASE_URL = process.env.BASE_URL;

const GET_BUGS_URL = BASE_URL + "bugs";

class BugService {
  async getAllBugs() {
    try {
      const response = await axios.get(GET_BUGS_URL);
      return response;
    } catch (err) {
      return err.response;
    }
  }
}

export default new BugService();
