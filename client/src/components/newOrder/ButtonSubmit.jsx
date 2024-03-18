import { useNavigate } from "react-router-dom";
import { getOrdersRequest, newOrderRequest } from "../../services/ordersRequest";
import { useMoviesStore } from "../../store/movies";
import { useOrdersStore } from "../../store/orders";
import { getAllMoviesRequest } from "../../services/moviesRequest";

export const ButtonSubmit = ({ moviesInOrder }) => {
    const navigate = useNavigate();
    const { setMovies } = useMoviesStore();
    const { setOrders } = useOrdersStore();

    const updateMoviesStock = async (movies) => {
        const order = movies.map((movie) => {
            return {
                movie: movie._id,
                quantity: movie.quantity,
            };
        });
        const res = await newOrderRequest(order);
        const moviesAll = await getAllMoviesRequest();
        const ordersAll = await getOrdersRequest();
        setMovies(moviesAll);
        setOrders(ordersAll);
    };

    const handleSubmit = async () => {
        updateMoviesStock(moviesInOrder);
        navigate("/inventory");
    };

    return (
        <div>
            {moviesInOrder.length === 0 ? (
                <button
                    type="button"
                    className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
                >
                    Add movies
                </button>
            ) : (
                <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            )}
        </div>
    );
};
