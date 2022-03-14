import axios from "axios";

const instance = axios.create();

const getAuthToken = localStorage.getItem("state");
const { access } =
  JSON.parse(getAuthToken)?.AuthReducer?.user?.user?.token;


instance.defaults.headers.common["Authorization"] = `Bearer ${access}`;

export default instance;
