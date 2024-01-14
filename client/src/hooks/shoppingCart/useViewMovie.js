import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useShoppingCartStore } from "../../store/shoppingCart";
import { useMoviesStore } from "../../store/movies";

export const useViewMovie = ({ isAuthenticated }) => {
    const [movie, setMovie] = useState({});
    const [alreadyInSc, setAlreadyInSc] = useState(false);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const { shoppingCart, loading: loadingSc } = useShoppingCartStore();
    const { movies, loading: loadingMovies } = useMoviesStore();

    useEffect(() => {
        if (!(loadingMovies || loadingSc)) {
            setMovie(movies.find((m) => m._id === id));
            if (isAuthenticated) {
                if (shoppingCart.movies.some((m) => m.movie._id === id)) {
                    console.info("first");
                    setAlreadyInSc(true);
                } else {
                    console.info("ft");
                    setAlreadyInSc(false);
                }
            }
            setLoading(false);
        }
    }, [id, shoppingCart, loadingMovies, loadingSc, movie]);
    // }, [id, movie]);

    return {
        movie,
        alreadyInSc,
        loading,
    };
};
