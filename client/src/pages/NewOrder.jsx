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
        console.log("first");
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
        <>
            <div className="grid place-items-center mx-72">
                <div class="w-full p-16 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-12">
                    <div class="flex items-center justify-between mb-4">
                        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
                            New order
                        </h5>
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
                    </div>
                    <div class="flow-root">
                        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                            {moviesInOrder.map((movie) => {
                                return (
                                    <li class="py-3 sm:py-4">
                                        <div class="flex items-center space-x-4">
                                            <div class="flex-shrink-0">
                                                <button
                                                    className="text-white right-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                                    type="button"
                                                    onClick={handleDelete}
                                                    id={movie._id}
                                                >
                                                    X
                                                </button>
                                            </div>
                                            <div class="flex-1 min-w-0">
                                                <p class="font-medium text-gray-900 truncate dark:text-white">
                                                    {movie.title}
                                                </p>
                                                <p class=" text-gray-500 truncate dark:text-gray-400">
                                                    Stock: {movie.stock}
                                                </p>
                                            </div>
                                            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                <input
                                                    type="number"
                                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-16"
                                                    placeholder=""
                                                    onChange={handleQ}
                                                    min="1"
                                                    name="quantity"
                                                    id={movie._id}
                                                />
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>

                    <div className="mt-6">
                        {bNewMovie ? (
                            <button
                                type="button"
                                className="mb-9 text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-stale-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-stale-600 dark:hover:bg-stale-700 dark:focus:ring-stale-800"
                                onClick={() => setBNewMovie(!bNewMovie)}
                            >
                                Cancel
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                onClick={() => setBNewMovie(!bNewMovie)}
                            >
                                Add another movie
                            </button>
                        )}
                        {bNewMovie && <FormOrder />}
                    </div>
                </div>
            </div>
        </>
    );
};
