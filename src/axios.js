import axios from "axios";

const instance = axios.create();

const getAuthToken = localStorage.getItem("state");
const token = JSON.parse(getAuthToken)?.AuthReducer?.user?.user?.token;

if (token) {
  instance.defaults.headers.common["Authorization"] = `Bearer${" "}${
    token?.access ?? ""
  }`;
}

export default instance;
