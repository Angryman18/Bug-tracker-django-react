import axios from "axios";

const customAxios = () => {
  const instance = axios.create();
  const getAuthToken = localStorage.getItem("state");
  const token = JSON.parse(getAuthToken)?.AuthReducer?.user?.user?.token;

  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer${" "}${
      token?.access ?? ""
    }`;
  } else {
    return instance
  }
  return instance;
};

export default customAxios;
