import { useMoviesStore } from "../store/movies";
import { usePurchasesStore } from "../store/purchases";
import { useOrdersStore } from "../store/orders";
import { useShoppingCartStore } from "../store/shoppingCart";
import { useAuthStore } from "../store/auth";
import {
    getAllMoviesRequest,
    getPurchasesRequest,
    getShoppingCartRequest,
} from "../services/moviesAPI";
import { getOrdersRequest } from "../services/orderAPI";

const { user } = useAuthStore();
const { setMovies, setLoading: setLoadingMovies } = useMoviesStore();
const { setPurchases, setLoading: setLoadingPurchases } = usePurchasesStore();
const { setOrders, setLoading: setLoadingOrders } = useOrdersStore();
const { setShoppingCart, setLoading: setLoadingShoppingCart } = useShoppingCartStore();

const getMovies = async () => {
    const movies = await getAllMoviesRequest();
    setMovies(movies);
    setLoadingMovies(false);
};
const getPurchases = async () => {
    const p = await getPurchasesRequest();
    setPurchases(p);
    setLoadingPurchases(false);
};
const getOrders = async () => {
    const o = await getOrdersRequest();
    setOrders(o);
    setLoadingOrders(false);
};
const getShoppingCart = async () => {
    const sc = await getShoppingCartRequest();
    setShoppingCart(sc);
    setLoadingShoppingCart(false);
};

export const getData = () => {
    if (user == null) {
        getMovies();
        console.info("Solicitud Grande");
    } else {
        if (user.isAdmin) {
            getOrders();
            getPurchases();
        }
        console.info("Solicitud Grande");
        getShoppingCart();
        getMovies();
    }
};
