import { Button, Card, CardBody } from "@nextui-org/react";
import { useViewMovie } from "../hooks/shoppingCart/useViewMovie.js";
import { useShoppingCartStore } from "../store/shoppingCart";
import { useAuthStore } from "../store/auth.js";
import { useUpdateShoppingCart } from "../hooks/shoppingCart/useUpdateShoppingCart.js";
import { LoadingScreen } from "../components/ui/LoadingScreen.jsx";

export const ViewMovie = () => {
    const { isAuthenticated } = useAuthStore();
    const { movie, loading, alreadyInSc } = useViewMovie({ isAuthenticated });
    const { shoppingCart, setShoppingCart } = useShoppingCartStore();
    useUpdateShoppingCart();

    const addToShoppingCart = (movie) => {
        const newMovies = shoppingCart.concat({
            id: movie._id,
            title: movie.title,
            stock: movie.stock,
            price: movie.price,
            quantity: 1,
        });
        setShoppingCart(newMovies);
    };

    return (
        <>
            {loading ? (
                <LoadingScreen />
            ) : (
                <>
                    <div className="flex justify-center items-center h-[calc(100vh-64px)]">
                        <Card className="w-[122ch] h-[800px] mx-3 lg:mx-7 backdrop-blur-none">
                            <CardBody className="p-4">
                                <div className="grid grid-cols-12 gap-6 md:gap-5 items-center h-full">
                                    <div className="flex lg:h-full justify-center col-span-12 p-0 lg:p-1 lg:col-span-6">
                                        <img
                                            className=" w-1/2 lg:w-4/5 2xl:w-4/5 2xl:h-full rounded-xl"
                                            alt="Album cover"
                                            src={movie.image.url}
                                        />
                                    </div>
                                    <div className="flex lg:flex-none -mt-8 xs:mt-0 text-center lg:text-left items-center lg:items-start flex-col col-span-12 lg:col-span-6 p-0 lg:pr-2">
                                        <h1 className="text-base sm:text-2xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold">
                                            {movie.title}
                                        </h1>
                                        <span className="text-base sm:text-xl md:text-2xl lg:text-4xl text-foreground-600 mt-2">
                                            {movie.year}
                                        </span>
                                        <p className="my-4 text-xl lg:text-2xl">
                                            Lorem, ipsum dolor sit amet consectetur
                                            adipisicing elit. Consequuntur voluptate
                                            exercitationem eos veniam voluptatum soluta,
                                            fugit a eveniet quo sunt consectetur culpa,
                                            nesciunt sint delectus earum nisi dicta, totam
                                            animi.
                                        </p>
                                        {isAuthenticated &&
                                            (movie.stock > 0 ? (
                                                alreadyInSc ? (
                                                    <Button
                                                        size="lg"
                                                        isDisabled={true}
                                                        color="primary"
                                                    >
                                                        Already in shopping cart
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        color="primary"
                                                        size="lg"
                                                        onClick={() => {
                                                            addToShoppingCart(movie);
                                                        }}
                                                    >
                                                        Add to shopping cart
                                                    </Button>
                                                )
                                            ) : (
                                                <Button
                                                    size="lg"
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
                </>
            )}
        </>
    );
};
