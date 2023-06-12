import { useEffect, useState } from "react";
import { useMovies } from "../context/MoviesContext";
import Select from "react-select";
import { FormOrder } from "../components/FormOrder";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const NewOrder = () => {
    const { movies, updateMoviesStock } = useMovies();
    const [moviesInSelect, setMoviesInSelect] = useState(movies);
    const [moviesInOrder, setMoviesInOrder] = useState([]);
    const [bNewMovie, setBNewMovie] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.isAdmin) {
            navigate("/");
        }
    }, [user]);

    const handleSubmit = async () => {
        updateMoviesStock(moviesInOrder);
        navigate("/");
    };

    function handleSelect(data) {
        setMoviesInSelect(moviesInSelect.filter((movie) => movie._id !== data.value));
    }

    const handleQ = (event) => {
        const value = event.target.value;
        const id = event.target.id;
        setMoviesInOrder(
            moviesInOrder.map((movie) =>
                movie._id === id ? { ...movie, quantity: value } : movie,
            ),
        );
    };

    const handleDelete = (event) => {
        const id = event.target.id;
        const moviesToSelect = moviesInOrder.filter((movie) => movie._id !== id);
        const moviesAux = movies.filter((ar) => !moviesToSelect.find((rm) => ar._id === rm._id));
        setMoviesInSelect(moviesAux);
    };

    useEffect(() => {
        const moviesAux = movies.filter((ar) => !moviesInSelect.find((rm) => ar._id === rm._id));
        setMoviesInOrder(
            moviesAux.map((movie) => {
                return {
                    ...movie,
                    quantity: 0,
                };
            }),
        );
    }, [moviesInSelect, movies]);

    return (
        <div>
            <div className="mr-2 text-black">
                <div className="dropdown-container">
                    <Select
                        options={moviesInSelect.map((movie) => {
                            return {
                                value: movie._id,
                                label: movie.title,
                            };
                        })}
                        placeholder="Search a Movie"
                        value={""}
                        onChange={handleSelect}
                        isSearchable={true}
                    />
                </div>
            </div>
            {moviesInOrder.map((movie) => {
                return (
                    <div key={movie._id}>
                        <p>
                            {movie.title} {movie.stock}
                        </p>
                        <input
                            type="number"
                            name="quantity"
                            min="1"
                            id={movie._id}
                            className="text-black"
                            onChange={handleQ}
                        />
                        <button type="button" id={movie._id} onClick={handleDelete}>
                            Eliminar
                        </button>
                    </div>
                );
            })}

            {bNewMovie ? (
                <button type="button" onClick={() => setBNewMovie(!bNewMovie)}>
                    Cancel
                </button>
            ) : (
                <button type="button" onClick={() => setBNewMovie(!bNewMovie)}>
                    Add another
                </button>
            )}
            <button type="button" onClick={handleSubmit}>
                Add
            </button>
            {bNewMovie && <FormOrder />}
        </div>
    );
};
