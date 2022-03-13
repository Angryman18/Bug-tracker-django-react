import axios from "axios";

const BASE_URL = process.env.BASE_URL;

const GET_BUGS_URL = BASE_URL + "bugs";
const FILTER_BUG_DATEWISE = BASE_URL + "filterBugDateRange";

class BugService {
  async getAllBugs() {
    try {
      const response = await axios.get(GET_BUGS_URL);
      return response;
    } catch (err) {
      return err.response;
    }
  }

  async getFilteredBugs(Obj) {
    try {
      const response = await axios.post(FILTER_BUG_DATEWISE, Obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (err) {
      return err.response;
    }
  }
}

export default new BugService();
