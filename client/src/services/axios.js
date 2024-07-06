import axios from "axios";

const baseUrl =
	process.env.NODE_ENV === "production"
		? "https://api-production-80eb.up.railway.app/api/"
		: "http://localhost:3000/api";

const instance = axios.create({
	baseURL: baseUrl,
	withCredentials: true,
});

export default instance;
