import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useShoppingCartStore } from "../../store/shoppingCart";
import { useMoviesStore } from "../../store/movies";

export const useViewMovie = () => {
    const [movie, setMovie] = useState({});
    const [alreadyInSC, setAlreadyInSC] = useState(false);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const { shoppingCart, loading: loadingSC } = useShoppingCartStore();
    const { movies, loading: loadingMovies } = useMoviesStore();

    useEffect(() => {
        if (!(loadingMovies || loadingSC)) {
            console.log("fsfsfs");
            setMovie(movies.filter((m) => m._id === id)[0]);
            if (shoppingCart.movies.some((m) => m.movie._id === id)) {
                setAlreadyInSC(true);
            } else {
                setAlreadyInSC(false);
            }
            setLoading(false);
        }
    }, [id, shoppingCart]);

    return {
        movie,
        alreadyInSC,
        loading,
    };
};
