import { Button, Card, CardBody } from "@nextui-org/react";
import { useViewMovie } from "../hooks/shoppingCart/useViewMovie.js";
import { useShoppingCartStore } from "../store/shoppingCart";
import { useAuthStore } from "../store/auth.js";
import { useUpdateShoppingCart } from "../hooks/shoppingCart/useUpdateShoppingCart.js";
import { LoadingScreen } from "../components/ui/LoadingScreen.jsx";
import { useScreenSize } from "../hooks/useSizeWindow.js";

export const ViewMovie = () => {
    const { isAuthenticated } = useAuthStore();
    const { movie, loading, alreadyInSc } = useViewMovie({ isAuthenticated });
    const { shoppingCart, setShoppingCart } = useShoppingCartStore();
    const { width } = useScreenSize();
    useUpdateShoppingCart();

    const addToShoppingCart = (movie) => {
        const newMovies = shoppingCart.concat({
            id: movie.id,
            title: movie.title,
            stock: movie.stock,
            price: movie.price,
            quantity: 1,
        });
        setShoppingCart(newMovies);
    };

    const buttonSize = width < 768 ? "md" : "lg";

    return (
        <>
            {loading ? (
                <LoadingScreen />
            ) : (
                <div className="flex justify-center mt-3 mx-6">
                    <Card className="w-[122ch] p-2 sm:p-4">
                        <CardBody>
                            <div className="grid grid-cols-12 items-center h-full">
                                <div className="flex lg:h-full justify-center col-span-12 md:col-span-6">
                                    <img
                                        className="w-2/3 md:w-4/5 2xl:w-4/5 2xl:h-full rounded-xl"
                                        alt="Album cover"
                                        src={movie.image.url}
                                    />
                                </div>
                                <div className="mt-3 md:mt-0 flex lg:flex-none text-center md:text-left items-center md:items-start flex-col col-span-12 md:col-span-6 p-0 lg:pr-2">
                                    <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                                        {movie.title}
                                    </h1>
                                    <span className="text-xl md:text-2xl lg:text-4xl text-foreground-600 mt-2">
                                        {movie.year}
                                    </span>
                                    <p className="my-4 text-sm  sm:text-base lg:text-2xl">
                                        {movie.description
                                            ? movie.description
                                            : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur voluptate exercitationem eos veniam voluptatum soluta, fugit a eveniet quo sunt consectetur culpa, nesciunt sint delectus earum nisi dicta, totamanimi."}
                                    </p>
                                    {isAuthenticated &&
                                        (movie.stock > 0 ? (
                                            alreadyInSc ? (
                                                <Button
                                                    size={buttonSize}
                                                    isDisabled={true}
                                                    color="primary"
                                                >
                                                    Already in shopping cart
                                                </Button>
                                            ) : (
                                                <Button
                                                    color="primary"
                                                    size={buttonSize}
                                                    onClick={() => {
                                                        addToShoppingCart(movie);
                                                    }}
                                                >
                                                    Add to shopping cart
                                                </Button>
                                            )
                                        ) : (
                                            <Button
                                                size={buttonSize}
                                                isDisabled={true}
                                                color="default"
                                            >
                                                No stock
                                            </Button>
                                        ))}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            )}
        </>
    );
};
