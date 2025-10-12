import axios from "./axios";

export const getPurchasesRequest = async () => {
    const res = await axios.get("/purchases");
    return res.data;
};
