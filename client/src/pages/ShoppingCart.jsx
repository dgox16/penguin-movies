import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartCard } from "../components/shoppingCart/ShoppingCartCard";
import { useUpdateShoppingCart } from "../hooks/shoppingCart/useUpdateShoppingCart";
import {
    buyShoppingCartRequest,
    getAllMoviesRequest,
    getPurchasesRequest,
    getShoppingCartRequest,
} from "../services/moviesAPI";
import { useMoviesStore } from "../store/movies";
import { usePurchasesStore } from "../store/purchases";
import { useShoppingCartStore } from "../store/shoppingCart";

export const ShoppingCart = () => {
    const { shoppingCart, setShoppingCart } = useShoppingCartStore();
    const { setMovies } = useMoviesStore();
    const { setPurchases } = usePurchasesStore();
    const navigate = useNavigate();
    useUpdateShoppingCart();

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
        <div className="flex justify-center mt-12">
            <Card className="w-[122ch] p-4">
                <CardHeader className="flex gap-3 mb-3">
                    <div className="flex flex-col">
                        <p className="text-xl">Shopping Cart</p>
                    </div>
                </CardHeader>
                <CardBody>
                    <Divider />
                    <ul>
                        {shoppingCart.map((movie) => (
                            <div key={movie.id}>
                                <ShoppingCartCard movie={movie} />
                                <Divider />
                            </div>
                        ))}
                    </ul>
                </CardBody>
                <CardFooter className="justify-end">
                    <Button
                        type="button"
                        color="success"
                        size="lg"
                        onClick={handleSubmit}
                    >
                        Buy
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};
