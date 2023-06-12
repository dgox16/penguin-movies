import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovies } from "../context/MoviesContext";

export const ViewMovie = () => {
    const [movie, setMovie] = useState({});
    const [alreadyInSC, setAlreadyInSC] = useState(false);
    const { id } = useParams();
    const { movies, addToShoppingCart, shoppingCart } = useMovies();

    useEffect(() => {
        console.log("first");
        setMovie(movies.filter((m) => m._id === id)[0]);
        if (shoppingCart.movies.some((m) => m.movie._id === id)) {
            setAlreadyInSC(true);
        } else {
            setAlreadyInSC(false);
        }
    }, [id, shoppingCart]);

    const handleSubmit = () => {
        addToShoppingCart(movie);
    };

    return (
        <>
            <div>{movie.title}</div>
            {movie.stock > 0 ? (
                alreadyInSC ? (
                    <p>Ya esta</p>
                ) : (
                    <button type="button" onClick={handleSubmit}>
                        Add
                    </button>
                )
            ) : (
                <p>No se puede</p>
            )}
        </>
    );
};
