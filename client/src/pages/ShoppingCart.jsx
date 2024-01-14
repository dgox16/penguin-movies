import { useNavigate } from "react-router-dom";
import { ShoppingCartCard } from "../components/shoppingCart/ShoppingCartCard";
import { useShoppingCartStore } from "../store/shoppingCart";
import {
    buyShoppingCartRequest,
    getAllMoviesRequest,
    getPurchasesRequest,
    getShoppingCartRequest,
} from "../services/moviesAPI";
import { useMoviesStore } from "../store/movies";
import { usePurchasesStore } from "../store/purchases";

export const ShoppingCart = () => {
    const { shoppingCart, setShoppingCart } = useShoppingCartStore();
    const { setMovies } = useMoviesStore();
    const { setPurchases } = usePurchasesStore();
    const navigate = useNavigate();

    const buyShoppingCart = async () => {
        await buyShoppingCartRequest();
        const sc = await getShoppingCartRequest();
        setShoppingCart(sc);
        const moviesAll = await getAllMoviesRequest();
        setMovies(moviesAll);
        const purchasesAll = await getPurchasesRequest();
        setPurchases(purchasesAll);
    };

    const handleSubmit = () => {
        buyShoppingCart();
        navigate("/");
    };

    return (
        <div className="grid place-items-center">
            <div className="w-3/4 p-16 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-12">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                        Shopping Cart
                    </h5>
                </div>
                <div className="flow-root">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {shoppingCart.map((movie) => (
                            <ShoppingCartCard movie={movie} key={movie._id} />
                        ))}
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
