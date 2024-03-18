import axios from "./axios";

export const registerRequest = async (credentials) => {
    const res = await axios.post("/user/register", credentials);
    return res.data;
};

export const loginRequest = async (credentials) => {
    const res = await axios.post("/user/login", credentials);
    return res.data;
};

export const verifyTokenRequest = async () => {
    const res = await axios.get("/auth/verify");
    return res.data;
};

export const logoutRequest = async () => {
    const res = await axios.get("/auth/logout");
    return res.data;
};
