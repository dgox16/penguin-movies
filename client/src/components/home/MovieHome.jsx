import { Card, CardFooter, CardHeader, Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ListOfMovies = ({ movies }) => {
    const navigate = useNavigate();
    const onClickHandler = (movie) => {
        navigate(`/movies/${movie.id}`);
    };

    return (
        <>
            {movies.map((movie) => (
                <motion.div whileHover={{ scale: 1.05 }} key={movie.id}>
                    <Card
                        isFooterBlurred={true}
                        className="col-span-1 aspect-w-2 aspect-h-3"
                        isPressable={true}
                        onPress={() => onClickHandler(movie)}
                    >
                        <CardHeader className="absolute z-10 flex-col items-end">
                            <h4 className="text-white rounded-xl p-1 bg-black/80 z-10 font-bold text-xl  xs:text-base md:text-2xl justify-end">
                                ${movie.price}
                            </h4>
                        </CardHeader>
                        <Image
                            alt="Card example background"
                            className="z-0 w-full h-full -translate-y-6 object-cover"
                            src={movie.image.url}
                        />
                        <CardFooter className="absolute bg-black/20 bottom-0 border-t-1 border-black/50 z-10 justify-center">
                            <div>
                                <p className="text-white font-bold text-lg xs:text-xs sm:text-sm md:text-[1.02rem] lg:text-[1.04rem] xl:text-xl text-center mx-0 md:mx-3">
                                    {movie.title}
                                </p>
                            </div>
                        </CardFooter>
                    </Card>
                </motion.div>
            ))}
        </>
    );
};

const NotFoundMovies = () => {
    return <p>No se encontraron películas para esta búsqueda</p>;
};

export const MoviesHome = ({ movies, open }) => {
    const hasMovies = movies?.length > 0;
    return hasMovies ? <ListOfMovies movies={movies} open={open} /> : <NotFoundMovies />;
};
