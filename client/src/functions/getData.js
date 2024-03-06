import {
    getAllMoviesRequest,
    getPurchasesRequest,
    getShoppingCartRequest,
} from "../services/moviesAPI";
import { getOrdersRequest } from "../services/orderAPI";

export const getMovies = async (setMovies, setLoadingMovies) => {
    const movies = await getAllMoviesRequest();
    setMovies(movies);
    setLoadingMovies(false);
};
export const getPurchases = async (setPurchases, setLoadingPurchases) => {
    const p = await getPurchasesRequest();
    setPurchases(p);
    setLoadingPurchases(false);
};
export const getOrders = async (setOrders, setLoadingOrders) => {
    const o = await getOrdersRequest();
    setOrders(o);
    setLoadingOrders(false);
};
export const getShoppingCart = async (setShoppingCart, setLoadingShoppingCart) => {
    const sc = await getShoppingCartRequest();
    setShoppingCart(sc);
    setLoadingShoppingCart(false);
};
