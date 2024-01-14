import { useEffect } from "react";
import { updateShoppingCartRequest } from "../../services/moviesAPI";
import { useShoppingCartStore } from "../../store/shoppingCart";

export const ShoppingCartCard = ({ movie }) => {
    const { shoppingCart, setShoppingCart } = useShoppingCartStore();

    useEffect(() => {
        const updateShoppingCartDb = async () => {
            if (shoppingCart.length === 0) {
                return;
            }
            const aux = shoppingCart.map((m) => {
                return {
                    movie: m._id,
                    quantity: m.quantity,
                };
            });
            console.log(aux);
            await updateShoppingCartRequest(aux);
        };
        updateShoppingCartDb();
    }, [shoppingCart]);

    const updateShoppingCart = async (movies) => {
        setShoppingCart({ ...shoppingCart, movies: movies });
    };

    const deleteByShoppingCart = (id) => {
        const newMovies = shoppingCart.filter((movie) => movie._id !== id);
        console.log(newMovies);
        setShoppingCart({ ...shoppingCart, movies: newMovies });
    };

    const handleChangeQuantity = (event) => {
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

    return (
        <div>
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <button
                            className="text-white right-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                            type="button"
                            onClick={handleDelete}
                            id={movie._id}
                        >
                            X
                        </button>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate dark:text-white">
                            {movie.title}
                        </p>
                        <p className=" text-gray-500 truncate dark:text-gray-400">
                            Stock: {movie.stock}
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <input
                            type="number"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-16"
                            placeholder=""
                            onChange={handleChangeQuantity}
                            min="1"
                            name="quantity"
                            id={movie._id}
                        />
                    </div>
                </div>
            </li>
        </div>
    );
};
