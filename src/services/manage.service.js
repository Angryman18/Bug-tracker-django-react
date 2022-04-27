import customAxios from "./axios.service";
import {
  GET_USER_SPECEFIC_CONTENTS,
  UPDATE_BUG_STATUS,
  UPDATE_FEATURES,
  DELETE_FEATURE,
  DELETE_BUG,
} from "./api-endpoints";

class ManageService {
  async getUserSpeceficContent() {
    try {
      const response = await customAxios.post(GET_USER_SPECEFIC_CONTENTS, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response?.data;
    } catch (err) {
      return err?.response?.data;
    }
  }

  async updateFeatureStatus(Obj) {
    try {
      const response = await customAxios.post(UPDATE_FEATURES, Obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  }

  async deleteFeature(id) {
    try {
      const response = await customAxios.post(
        DELETE_FEATURE,
        { id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  }

  async deleteBug(id) {
    try {
      const response = await customAxios.post(
        DELETE_BUG,
        { id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  }

  async updateBugStatus(Obj) {
    try {
      const response = await customAxios.post(UPDATE_BUG_STATUS, Obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  }
}

export default new ManageService();
