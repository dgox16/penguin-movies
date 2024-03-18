import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Link,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartCard } from "../components/shoppingCart/ShoppingCartCard";
import { useUpdateShoppingCart } from "../hooks/shoppingCart/useUpdateShoppingCart";
import { useMoviesStore } from "../store/movies";
import { usePurchasesStore } from "../store/purchases";
import { useShoppingCartStore } from "../store/shoppingCart";
import { useScreenSize } from "../hooks/useSizeWindow";
import { buyShoppingCartRequest } from "../services/shoppingCartRequest";
import { getPurchasesRequest } from "../services/purchasesRequest";

export const ShoppingCart = () => {
    const { shoppingCart, setShoppingCart } = useShoppingCartStore();
    const { setMovies, movies } = useMoviesStore();
    const { setPurchases } = usePurchasesStore();
    const { width } = useScreenSize();
    const navigate = useNavigate();
    useUpdateShoppingCart();

    const updateStock = (moviesToUpdated, shoppingCartCurrent) => {
        shoppingCartCurrent.forEach((item) => {
            const movieAux = moviesToUpdated.find((m) => m._id === item.id);
            if (movieAux) {
                movieAux.stock -= item.quantity;
            }
        });
        return moviesToUpdated;
    };

    const buyShoppingCart = async () => {
        const moviesUpdated = updateStock(movies, shoppingCart);
        setMovies(moviesUpdated);
        await buyShoppingCartRequest();
        setShoppingCart([]);
        const purchasesAll = await getPurchasesRequest();
        setPurchases(purchasesAll);
    };

    const handleSubmit = () => {
        buyShoppingCart();
        navigate("/");
    };

    const buttonSize = width < 640 ? "md" : "lg";

    return (
        <div className="flex justify-center mt-3 mx-6 ">
            <Card className="w-[122ch] p-2 sm:p-4">
                <CardHeader className="flex gap-3 mb-3">
                    <div className="flex flex-col">
                        <p className="text-2xl sm:text-3xl font-bold">Shopping Cart</p>
                    </div>
                </CardHeader>
                <CardBody>
                    <Divider />
                    {shoppingCart.length > 0 ? (
                        <ul>
                            {shoppingCart.map((movie) => (
                                <div key={movie.id}>
                                    <ShoppingCartCard movie={movie} />
                                    <Divider />
                                </div>
                            ))}
                        </ul>
                    ) : (
                        <div className="flex my-5 items-center flex-col">
                            <h1 className="text-xl xs:text-2xl sm:text-3xl text-center">
                                Add movies to your cart.{" "}
                            </h1>
                            <Link
                                color="warning"
                                className="text-xl xs:text-2xl sm:text-3xl mt-2"
                                href="/"
                                aria-current="page"
                            >
                                Let's get to it!
                            </Link>
                        </div>
                    )}
                </CardBody>
                <CardFooter className="justify-end">
                    <Button
                        type="button"
                        color="success"
                        size={buttonSize}
                        onClick={handleSubmit}
                    >
                        Buy
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};
