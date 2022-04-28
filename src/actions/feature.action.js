import featureService from "../services/feature.service";
import { GET_ALL_FEATURES, GET_ALL_FEATURE_FAIL } from "./types";

export const retrieveAllFeature = () => (dispatch) => {
  return featureService
    .getAllFeatures()
    .then((res) => {
      dispatch({ type: GET_ALL_FEATURES, payload: res });
    })
    .catch(() => {
      dispatch({ type: GET_ALL_FEATURE_FAIL });
    });
};
