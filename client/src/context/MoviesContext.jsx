import { createContext, useContext, useEffect, useState } from "react";
import {
    buyShoppingCartRequest,
    getAllMoviesRequest,
    getPurchasesRequest,
    getShoppingCartRequest,
    newMovieOrderRequest,
    updateShoppingCartRequest,
} from "../services/moviesAPI";
import { getOrdersRequest, newOrderRequest } from "../services/orderAPI";
import { useAuth } from "./AuthContext";

const MoviesContext = createContext();

export const useMovies = () => {
    const context = useContext(MoviesContext);
    if (!context) {
        throw new Error("UseAuth must be used within an AuthProvider");
    }
    return context;
};

export const MoviesProvider = ({ children }) => {
    const { user, isAuthenticated } = useAuth();
    const [movies, setMovies] = useState([]);
    const [shoppingCart, setShoppingCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [loadingMovies, setLoadingMovies] = useState(true);
    const [loadingSC, setLoadingSC] = useState(true);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [loadingPurchases, setLoadingPurchases] = useState(true);

    useEffect(() => {
        const getData = async () => {
            const movies = await getAllMoviesRequest();
            setMovies(movies);
            setLoadingMovies(false);
        };
        const getShoppingCart = async () => {
            const sc = await getShoppingCartRequest();
            setShoppingCart(sc);
            setLoadingSC(false);
        };
        const getOrders = async () => {
            const o = await getOrdersRequest();
            setOrders(o);
            setLoadingOrders(false);
        };
        const getPurchases = async () => {
            const p = await getPurchasesRequest();
            console.log("dsadsd");
            console.log(p);
            setPurchases(p);
            setLoadingPurchases(false);
        };
        if (isAuthenticated) {
            getData();
            getShoppingCart();
            getOrders();
            getPurchases();
        }
    }, [user]);

    useEffect(() => {
        const updateShoppingCartDB = async () => {
            const aux = shoppingCart.movies.map((m) => {
                return {
                    movie: m.movie._id,
                    quantity: m.quantity,
                };
            });
            const res = await updateShoppingCartRequest(aux);
            console.log(res);
        };
        if (isAuthenticated) {
            updateShoppingCartDB();
        }
    }, [shoppingCart]);

    const updateShoppingCart = async (movies) => {
        setShoppingCart({ ...shoppingCart, movies: movies });
    };

    const addMovie = async (values) => {
        const res = await newMovieOrderRequest(values);
        setMovies([...movies, res]);
    };

    const addToShoppingCart = (movie) => {
        const newMovies = shoppingCart.movies.concat({ movie: movie, quantity: 1 });
        setShoppingCart({ ...shoppingCart, movies: newMovies });
    };

    const deleteByShoppingCart = (id) => {
        const newMovies = shoppingCart.movies.filter((movie) => movie.movie._id !== id);
        setShoppingCart({ ...shoppingCart, movies: newMovies });
    };

    const buyShoppingCart = async () => {
        const res = await buyShoppingCartRequest();

        console.log(res);
        const sc = await getShoppingCartRequest();
        setShoppingCart(sc);
        const moviesAll = await getAllMoviesRequest();
        setMovies(moviesAll);
        const purchasesAll = await getPurchasesRequest();
        setPurchases(purchasesAll);
    };

    const updateMoviesStock = async (movies) => {
        const order = movies.map((movie) => {
            return {
                movie: movie._id,
                quantity: movie.quantity,
            };
        });
        const res = await newOrderRequest(order);
        const moviesAll = await getAllMoviesRequest();
        const ordersAll = await getOrdersRequest();
        setMovies(moviesAll);
        setOrders(ordersAll);
    };

    return (
        <MoviesContext.Provider
            value={{
                movies,
                addMovie,
                updateMoviesStock,
                addToShoppingCart,
                shoppingCart,
                deleteByShoppingCart,
                updateShoppingCart,
                loadingMovies,
                loadingSC,
                buyShoppingCart,
                orders,
                loadingOrders,
                purchases,
                loadingPurchases,
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};
