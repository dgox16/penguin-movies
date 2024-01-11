import { Card, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useShoppingCartStore } from "../../store/shoppingCart";
import { useEffect, useState } from "react";
import { ModalButtons } from "./ModalButtons";

export const ModalCard = ({ movie, close }) => {
    const { shoppingCart, setShoppingCart } = useShoppingCartStore();

    const [alreadyInSc, setAlreadyInSc] = useState(false);

    useEffect(() => {
        setAlreadyInSc(shoppingCart.movies.some((m) => m.movie._id === movie._id));
    }, [shoppingCart, movie]);

    const addToShoppingCart = (movieToAdd) => {
        const newMovies = shoppingCart.movies.concat({ movie: movieToAdd, quantity: 1 });
        console.info(newMovies);
        setShoppingCart({ ...shoppingCart, movies: newMovies });
    };

    const handleSubmit = (movieToAdd) => {
        addToShoppingCart(movieToAdd);
    };

    const modalVariants = {
        open: {
            opacity: 1,
            transition: { staggerChildren: 0.5, delayChildren: 0.2 },
        },
        closed: {
            opacity: 0,
            blur: 0,
        },
    };

    return (
        <motion.div
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
            className="flex items-center justify-center lg:no-flex"
        >
            <Card
                isBlurred={true}
                className="w-4/5 h-[45ch] sm:w-[55ch] md:w-[65ch] border xs:h-full lg:w-[80ch] lg:h-[50ch] border-zinc-600 bg-background/60 dark:bg-black/50"
                shadow="sm"
            >
                <CardBody>
                    <div className="grid grid-cols-6 lg:grid-cols-12 gap-6 md:gap-4 items-center h-full">
                        <div className="flex lg:h-full justify-center col-span-6 p-0 lg:p-4 lg:col-span-5">
                            <img
                                className="w-3/5 lg:w-full lg:h-full"
                                alt="Album cover"
                                src={movie.image.url}
                            />
                        </div>
                        <div className="flex lg:flex-none -mt-8 xs:mt-0 text-center lg:text-left items-center lg:items-start flex-col col-span-6 lg:col-span-7 p-0 lg:pr-2">
                            <h1 className="text-base sm:text-2xl md:text-4xl font-bold">
                                {movie.title}
                            </h1>
                            <span className="text-base sm:text-xl md:text-2xl text-foreground-600">
                                {movie.year}
                            </span>
                            <p className="mt-2 hidden sm:flex text-base">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                Consequuntur voluptate exercitationem eos veniam
                                voluptatum soluta, fugit a eveniet quo sunt consectetur
                                culpa, nesciunt sint delectus earum nisi dicta, totam
                                animi.
                            </p>
                            <p className="mt-2 text-sm sm:text-base flex sm:hidden">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                Consequuntur voluptate exercitationem eos veniam animi.
                            </p>
                            <ModalButtons
                                close={close}
                                movie={movie}
                                handleSubmit={handleSubmit}
                                alreadyInSc={alreadyInSc}
                            />
                        </div>
                    </div>
                </CardBody>
            </Card>
        </motion.div>
    );
};
