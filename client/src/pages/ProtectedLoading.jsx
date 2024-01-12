import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
    getAllMoviesRequest,
    getPurchasesRequest,
    getShoppingCartRequest,
} from "../services/moviesAPI";
import { useMoviesStore } from "../store/movies";
import { usePurchasesStore } from "../store/purchases";
import { getOrdersRequest } from "../services/orderAPI";
import { useOrdersStore } from "../store/orders";
import { useShoppingCartStore } from "../store/shoppingCart";
import { LoadingScreen } from "../components/ui/LoadingScreen";

export const ProtectedLoading = () => {
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
        setLoading: setLoadingSC,
        loading: loadingSC,
    } = useShoppingCartStore();

    useEffect(() => {
        const getData = async () => {
            const movies = await getAllMoviesRequest();
            setMovies(movies);
            setLoadingMovies(false);
        };
        const getPurchases = async () => {
            const p = await getPurchasesRequest();
            // console.log(p);
            setPurchases(p);
            setLoadingPurchases(false);
        };
        const getOrders = async () => {
            const o = await getOrdersRequest();
            // console.log(o);
            setOrders(o);
            setLoadingOrders(false);
        };
        const getShoppingCart = async () => {
            const sc = await getShoppingCartRequest();
            setShoppingCart(sc);
            setLoadingSC(false);
        };
        getData();
        getPurchases();
        getOrders();
        getShoppingCart();
    }, []);

    if (loadingMovies || loadingSC || loadingOrders || loadingPurchases) {
        return <LoadingScreen />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};
