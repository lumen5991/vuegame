import axios from "axios";

const clientHttp = axios.create({
  baseURL: "https://vercel.com/lumens-projects/nodegame.vercel.app",
});

export default clientHttp;
