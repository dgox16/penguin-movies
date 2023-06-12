import axios from "./axios";

export const newOrderRequest = async (order) => {
    const res = await axios.post("/order/new", order);
    return res.data;
};
