import axios from "axios";

const clientHttp = axios.create({
  baseURL: "http://localhost:3000/api",
});

export default clientHttp;
