import { useEffect } from "react";
import { useAuthStore } from "../../store/auth";
import { useMoviesStore } from "../../store/movies";
import { useOrdersStore } from "../../store/orders";
import { usePurchasesStore } from "../../store/purchases";
import { useShoppingCartStore } from "../../store/shoppingCart";
import {
    getMovies,
    getOrders,
    getPurchases,
    getShoppingCart,
} from "../../functions/getData";

export const useAllDataFetch = () => {
    const { user } = useAuthStore();
    const {
        setMovies,
        setLoading: setLoadingMovies,
        loading: loadingMovies,
    } = useMoviesStore();
    const {
        setPurchases,
        setLoading: setLoadingPurchases,
        loading: loadingPurchases,
    } = usePurchasesStore();
    const {
        setOrders,
        setLoading: setLoadingOrders,
        loading: loadingOrders,
    } = useOrdersStore();
    const {
        setShoppingCart,
        setLoading: setLoadingShoppingCart,
        loading: loadingShoppingCart,
    } = useShoppingCartStore();

    useEffect(() => {
        if (user == null) {
            getMovies(setMovies, setLoadingMovies);
        } else {
            if (user.isAdmin) {
                getOrders(setOrders, setLoadingOrders);
                getPurchases(setPurchases, setLoadingPurchases);
            }
            console.info("Solicitud Grande");
            getShoppingCart(setShoppingCart, setLoadingShoppingCart);
            getMovies(setMovies, setLoadingMovies);
        }
    }, []);

    return {
        loadingMovies,
        loadingShoppingCart,
        loadingOrders,
        loadingPurchases,
    };
};
