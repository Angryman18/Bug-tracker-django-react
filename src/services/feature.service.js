import customAxios from "./axios.service";

import { GET_ALL_FEATURES, ADD_FEATURE } from "./api-endpoints";

class FeatureService {
  async getAllFeatures() {
    try {
      const response = await customAxios.get(GET_ALL_FEATURES, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  }

  async addFeature() {
    try {
      const res = await customAxios.post(ADD_FEATURE, Obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  }
}

export default new FeatureService();
