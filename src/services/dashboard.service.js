import customAxios from "./axios.service";

import { GET_DASHBOARD_STATS } from "./api-endpoints";

class DashboardService {
  getDashboardStats = async () => {
    try {
      const response = await customAxios.get(GET_DASHBOARD_STATS);
      return response.data;
    } catch (err) {
      return Promise.reject(err.response);
    }
  };
}

export default new DashboardService();
