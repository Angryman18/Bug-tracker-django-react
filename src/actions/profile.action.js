import profileService from "@service/profile.service";
import { EDIT_PROFILE, EDIT_PROFILE_FAIL } from "./types";

export const updateProfile = (Obj) => (dispatch) => {
  return profileService
    .updateUserProfile(Obj)
    .then((res) => {
      dispatch({ type: EDIT_PROFILE, payload: res });
    })
    .catch((err) => {
      dispatch({ type: EDIT_PROFILE_FAIL, payload: err });
      throw new Error(err?.message);
    });
};
