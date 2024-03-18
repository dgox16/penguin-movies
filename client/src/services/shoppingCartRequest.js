import axios from "./axios";

export const getShoppingCartRequest = async () => {
    const res = await axios("/shoppingCart");
    return res.data;
};

export const updateShoppingCartRequest = async (movies) => {
    const res = await axios.put("/shoppingCart", movies);
    return res.data;
};

export const buyShoppingCartRequest = async () => {
    const res = await axios.get("/shoppingCart/buy");
    return res.data;
};
