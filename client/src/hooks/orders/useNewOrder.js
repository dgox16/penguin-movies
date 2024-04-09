import { useEffect, useState } from "react";
import { useMoviesStore } from "../../store/movies";

export const useNewOrder = () => {
    const { movies } = useMoviesStore();
    const [moviesInSelect, setMoviesInSelect] = useState(movies);
    const [moviesInOrder, setMoviesInOrder] = useState([]);

    const updateMoviesSelect = (id) => {
        setMoviesInSelect(moviesInSelect.filter((movie) => movie.id !== id));
    };

    const updateQuantity = (event) => {
        const value = event.target.value;
        const id = event.target.id;
        setMoviesInOrder(
            moviesInOrder.map((movie) =>
                movie.id === id ? { ...movie, quantity: value } : movie,
            ),
        );
    };

    const deleteMoviesSelect = (event) => {
        const id = event.target.id;
        const moviesToSelect = moviesInOrder.filter((movie) => movie.id !== id);
        const moviesAux = movies.filter(
            (ar) => !moviesToSelect.find((rm) => ar.id === rm.id),
        );
        setMoviesInSelect(moviesAux);
    };

    useEffect(() => {
        const moviesAux = movies.filter(
            (ar) => !moviesInSelect.find((rm) => ar.id === rm.id),
        );
        setMoviesInOrder(
            moviesAux.map((movie) => {
                return {
                    ...movie,
                    quantity: 1,
                };
            }),
        );
    }, [moviesInSelect, movies]);

    return {
        moviesInOrder,
        moviesInSelect,
        updateMoviesSelect,
        updateQuantity,
        deleteMoviesSelect,
    };
};
