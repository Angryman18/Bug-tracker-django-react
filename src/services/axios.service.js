import axios from "axios";

const instance = axios.create();

const getAuthToken = localStorage.getItem("state");
const getToken = JSON.parse(getAuthToken)?.AuthReducer?.user?.user?.token;

console.log('custom axios is running')

if (getToken) {
  instance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${getToken?.access}`;
}

export default instance;
