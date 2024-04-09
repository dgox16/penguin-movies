import { Button, Divider } from "@nextui-org/react";
import { MoviesInOrderCard } from "./MoviesInOrderCard";
import { useNavigate } from "react-router-dom";
import { useMoviesStore } from "../../store/movies";
import { useOrdersStore } from "../../store/orders";
import { newOrderRequest } from "../../services/ordersRequest";
import { getAllMoviesRequest } from "../../services/moviesRequest";

export const MoviesInOrder = ({ moviesInOrder, deleteMoviesSelect, updateQuantity }) => {
    const navigate = useNavigate();
    const { setMovies } = useMoviesStore();
    const { setOrders, orders } = useOrdersStore();

    const updateMoviesStock = async (movies) => {
        const order = movies.map((movie) => {
            return {
                movie: movie.id,
                quantity: movie.quantity,
            };
        });
        const res = await newOrderRequest(order);
        const moviesAll = await getAllMoviesRequest();
        setMovies(moviesAll);
        setOrders([...orders, res]);
    };

    const handleSubmit = () => {
        updateMoviesStock(moviesInOrder);
        // navigate("/inventory");
    };
    return (
        <>
            {moviesInOrder.length !== 0 ? (
                <>
                    <Divider />
                    {moviesInOrder.map((movie) => (
                        <div key={movie.id}>
                            <MoviesInOrderCard
                                movie={movie}
                                deleteMoviesSelect={deleteMoviesSelect}
                                updateQuantity={updateQuantity}
                            />
                            <Divider />
                        </div>
                    ))}
                    <div className="flex justify-end mt-5">
                        <Button
                            type="button"
                            color="success"
                            className="w-full sm:w-auto"
                            onClick={handleSubmit}
                        >
                            Complete the order
                        </Button>
                    </div>
                </>
            ) : (
                <div className="flex flex-col justify-center">
                    <Divider />
                    <h1 className="text-base xs:text-lg sm:text-xl lg:text-2xl my-6 text-default-400 text-center">
                        Add movies to this order using the search bar above.
                    </h1>
                    <Divider />
                </div>
            )}
        </>
    );
};
