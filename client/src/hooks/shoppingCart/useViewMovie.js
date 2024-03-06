import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useShoppingCartStore } from "../../store/shoppingCart";
import { useMoviesStore } from "../../store/movies";

export const useViewMovie = ({ isAuthenticated }) => {
    const [movie, setMovie] = useState({});
    const [alreadyInSc, setAlreadyInSc] = useState(false);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const { shoppingCart } = useShoppingCartStore();
    const { movies, loading: loadingMovies } = useMoviesStore();

    useEffect(() => {
        if (!loadingMovies) {
            setMovie(movies.find((m) => m._id === id));
            if (isAuthenticated) {
                setAlreadyInSc(shoppingCart.some((m) => m.id === id));
            }
            setLoading(false);
        }
    }, [id, shoppingCart, loadingMovies]);

    return {
        movie,
        alreadyInSc,
        loading,
    };
};
