import { GET_DASHBOARD_STATS, GET_DASHBOARD_STATS_FAIL } from "@actions/types";

const initialState = {};

const DashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD_STATS:
      return { ...action.payload };
    case GET_DASHBOARD_STATS_FAIL:
      return {};
    default:
      return state;
  }
};

export default DashboardReducer;
