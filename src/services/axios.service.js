import axios from "axios";

const instance = axios.create();

const getAuthToken = localStorage.getItem("state");
const getToken =
  getAuthToken !== undefined
    ? JSON.parse(getAuthToken)?.AuthReducer?.user?.user?.token
    : undefined;

if (getToken) {
  instance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${getToken?.access}`;
}

export default instance;
