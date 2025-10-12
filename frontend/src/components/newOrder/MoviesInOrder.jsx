import { Button, Divider } from "@heroui/react";
import { MoviesInOrderCard } from "./MoviesInOrderCard";
import { useMoviesStore } from "../../store/movies";
import { useOrdersStore } from "../../store/orders";
import { newOrderRequest } from "../../services/ordersRequest";

export const MoviesInOrder = ({ moviesInOrder, deleteMoviesSelect, updateQuantity }) => {
    const { setMovies, movies } = useMoviesStore();
    const { setOrders, orders } = useOrdersStore();

    const updateStock = (moviesToUpdated, moviesInOrder) => {
        moviesInOrder.forEach((item) => {
            const movieAux = moviesToUpdated.find((m) => m.id === item.id);
            if (movieAux) {
                movieAux.stock += Number.parseInt(item.quantity);
            }
        });
        return moviesToUpdated;
    };

    const updateMoviesStock = async (moviesInOrder) => {
        const order = moviesInOrder.map((movie) => {
            return {
                movie: movie.id,
                quantity: movie.quantity,
            };
        });
        const newOrder = await newOrderRequest(order);
        const moviesUpdated = updateStock(movies, moviesInOrder);
        setMovies(moviesUpdated);
        setOrders([...orders, newOrder]);
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
