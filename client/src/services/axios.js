import axios from "axios";

const instance = axios.create({
    // baseURL: "https://penguin-movies.onrender.com/api",
    baseURL: "https://penguin-movies-dev-gzfh.3.us-1.fl0.io/api/",
    // baseURL: "http://localhost:4000/api",
    withCredentials: true,
});

export default instance;
