import axios from "axios";

const baseUrl =
    process.env.NODE_ENV === "production"
        ? "https://penguin-movies-dev-gzfh.3.us-1.fl0.io/api/"
        : "http://localhost:4000/api";

const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});

export default instance;
