import axios from "./axios";

export const handleRegister = async (credentials) => {
    const res = await axios.post("/user/register", credentials);
    return res.data;
};

export const handleLogin = async (credentials) => {
    const res = await axios.post("/user/login", credentials);
    return res.data;
};

export const verifyTokenRequest = async () => {
    const res = await axios.get("/auth/verify");
    return res.data;
};
