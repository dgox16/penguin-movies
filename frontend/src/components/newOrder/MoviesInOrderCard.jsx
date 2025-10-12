import { Button, Input } from "@heroui/react";
import { useScreenSize } from "../../hooks/useSizeWindow";
import { useState } from "react";

export const MoviesInOrderCard = ({ movie, deleteMoviesSelect, updateQuantity }) => {
    const { width } = useScreenSize();
    const [localQuantity, setLocalQuantity] = useState(movie.quantity);
    const [errors, setErrors] = useState("");
    const handleDelete = (event) => {
        deleteMoviesSelect(event);
    };

    const validateQuantity = (event) => {
        const value = event.target.value;

        if (value === "" || Number.isNaN(value)) {
            setLocalQuantity("");
            setErrors("There is empty data");
            return;
        }

        const parsedValue = parseInt(value, 10);

        if (parsedValue < 1) {
            setErrors("Is not a valid value");
            return;
        }

        setLocalQuantity(parsedValue);
        setErrors("");
        updateQuantity(event);
    };

    const size = width < 640 ? "sm" : "md";

    return (
        <div className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    <Button
                        isIconOnly={true}
                        color="danger"
                        size={size}
                        aria-label="Like"
                        onClick={handleDelete}
                        id={movie.id}
                    >
                        X
                    </Button>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base font-medium truncate">
                        {movie.title}
                    </p>
                    <p className="text-sm sm:text-base text-gray-500 truncate dark:text-gray-400">
                        Stock: {movie.stock}
                    </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <Input
                        min={1}
                        onInput={validateQuantity}
                        name="quantity"
                        size={size}
                        isInvalid={errors ? true : false}
                        errorMessage={errors}
                        id={movie.id}
                        type="number"
                        value={localQuantity}
                        label="Quantity"
                        className=" w-20 sm:w-32"
                        labelPlacement="outside"
                    />
                </div>
            </div>
        </div>
    );
};
