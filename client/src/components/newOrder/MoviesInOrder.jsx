import { Button, Divider } from "@nextui-org/react";
import { MoviesInOrderCard } from "./MoviesInOrderCard";

export const MoviesInOrder = ({ moviesInOrder, deleteMoviesSelect, updateQuantity }) => {
    return (
        <>
            {moviesInOrder.length !== 0 ? (
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
                    <div className="flex justify-end mt-5">
                        <Button
                            type="button"
                            color="success"
                            className="w-full sm:w-auto"
                            // size={buttonSize}
                            // onClick={handleSubmit}
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
