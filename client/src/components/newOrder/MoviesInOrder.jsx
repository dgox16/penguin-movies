import { Divider } from "@nextui-org/react";
import { MoviesInOrderCard } from "./MoviesInOrderCard";

export const MoviesInOrder = ({ moviesInOrder, deleteMoviesSelect, updateQuantity }) => {
    return (
        <>
            <Divider />
            {moviesInOrder.map((movie) => (
                <div key={movie._id}>
                    <MoviesInOrderCard
                        movie={movie}
                        deleteMoviesSelect={deleteMoviesSelect}
                        updateQuantity={updateQuantity}
                    />
                    <Divider />
                </div>
            ))}
        </>
    );
};
