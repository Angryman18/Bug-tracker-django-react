import dashboardService from "@service/dashboard.service";
import { GET_DASHBOARD_STATS, GET_DASHBOARD_STATS_FAIL } from "./types";

export const getDashboardStatics = () => (dispatch) => {
  return dashboardService
    .getDashboardStats()
    .then((res) => {
      dispatch({ type: GET_DASHBOARD_STATS, payload: res });
    })
    .catch((err) => {
      dispatch({ type: GET_DASHBOARD_STATS_FAIL, payload: err });
    });
};
