import { createContext, useContext, useEffect, useState } from "react";
import {
    buyShoppingCartRequest,
    getAllMoviesRequest,
    getShoppingCartRequest,
    newMovieOrderRequest,
    updateShoppingCartRequest,
} from "../services/moviesAPI";
import { newOrderRequest } from "../services/orderAPI";
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
    const [movies, setMovies] = useState([]);
    const [shoppingCart, setShoppingCart] = useState([]);
    const { user, isAuthenticated } = useAuth();
    const [loadingMovies, setLoadingMovies] = useState(true);
    const [loadingSC, setLoadingSC] = useState(true);

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
        if (isAuthenticated) {
            getData();
            getShoppingCart();
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
        setMovies(moviesAll);
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
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};
