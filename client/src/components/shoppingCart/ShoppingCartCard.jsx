import { Button, Input } from "@nextui-org/react";
import { useShoppingCartStore } from "../../store/shoppingCart";
import { useState } from "react";

export const ShoppingCartCard = ({ movie }) => {
    const { shoppingCart, setShoppingCart } = useShoppingCartStore();
    const [localQuantity, setLocalQuantity] = useState(movie.quantity);
    const [errors, setErrors] = useState("");

    const validateQuantity = (event) => {
        const value = event.target.value;

        if (value === "" || isNaN(value)) {
            setLocalQuantity("");
            setErrors("You cannot leave fields empty");
            return;
        }

        const parsedValue = parseInt(value, 10);
        const stock = movie.stock;

        if (parsedValue < 1 || parsedValue > stock) {
            setErrors("No puedes dejar datos vacios");
            return;
        }

        setLocalQuantity(parsedValue);
        setErrors("");

        const id = event.target.id;
        const aux = shoppingCart.map((movie) =>
            movie.id === id ? { ...movie, quantity: parsedValue } : movie,
        );
        setShoppingCart(aux);
    };

    const handleChangeQuantity = (event) => {
        const value = event.target.value;
        if (value !== movie.quantity) {
            const id = event.target.id;
            const aux = shoppingCart.map((movie) =>
                movie.id === id ? { ...movie, quantity: parseInt(value) } : movie,
            );
            setShoppingCart(aux);
        }
    };

    const handleDelete = (event) => {
        const id = event.target.id;
        const newMovies = shoppingCart.filter((movie) => movie.id !== id);
        setShoppingCart(newMovies);
    };

    return (
        <div>
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <Button
                            isIconOnly={true}
                            color="danger"
                            aria-label="Like"
                            onClick={handleDelete}
                            id={movie.id}
                        >
                            X
                        </Button>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{movie.title}</p>
                        <p className=" text-gray-500 truncate dark:text-gray-400">
                            Stock: {movie.stock}
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <Input
                            min={1}
                            max={movie.stock}
                            onInput={validateQuantity}
                            name="quantity"
                            isInvalid={errors ? true : false}
                            errorMessage={errors}
                            id={movie.id}
                            type="number"
                            value={localQuantity}
                            label="Quantity"
                            className="w-32"
                            labelPlacement="outside"
                        />
                    </div>
                </div>
            </li>
        </div>
    );
};
