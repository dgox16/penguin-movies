import { useNavigate } from "react-router-dom";
import { useMovies } from "../context/MoviesContext";

export const ShoppingCart = () => {
    const { shoppingCart, deleteByShoppingCart, updateShoppingCart, buyShoppingCart } = useMovies();
    const navigate = useNavigate();

    const handleQ = (event) => {
        const value = event.target.value;
        const id = event.target.id;
        const aux = shoppingCart.movies.map((movie) =>
            movie.movie._id === id ? { ...movie, quantity: parseInt(value) } : movie,
        );
        updateShoppingCart(aux);
    };

    const handleDelete = (event) => {
        const id = event.target.id;
        deleteByShoppingCart(id);
    };

    const handleSubmit = () => {
        buyShoppingCart();
        navigate("/");
    };

    return (
        <div className="grid place-items-center mx-72">
            <div class="w-full p-16 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-12">
                <div class="flex items-center justify-between mb-4">
                    <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
                        Shopping Cart
                    </h5>
                </div>
                <div class="flow-root">
                    <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                        {shoppingCart.movies.map((movie) => {
                            return (
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-shrink-0">
                                            <button
                                                className="text-white right-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                                type="button"
                                                onClick={handleDelete}
                                                id={movie.movie._id}
                                            >
                                                X
                                            </button>
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <p class="font-medium text-gray-900 truncate dark:text-white">
                                                {movie.movie.title}
                                            </p>
                                            <p class=" text-gray-500 truncate dark:text-gray-400">
                                                Stock: {movie.movie.stock}
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
                                                id={movie.movie._id}
                                            />
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleSubmit}
                >
                    Buy
                </button>
            </div>
        </div>
    );
};
