import { Card, CardFooter, CardHeader, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const ListOfMovies = ({ movies }) => {
    const navigate = useNavigate();
    const pressHandler = (idMovie) => {
        navigate(`/movies/${idMovie}`);
    };

    return (
        <>
            {movies.map((movie) => (
                <Card
                    key={movie._id}
                    isFooterBlurred={true}
                    className="col-span-1 aspect-w-2 aspect-h-3"
                    isPressable={true}
                    onPress={() => pressHandler(movie._id)}
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

                // <div
                //     className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                //     key={movie._id}
                // >
                //     <Link
                //         to={{
                //             pathname: `/movies/${movie._id}`,
                //         }}
                //         state={{ movie: movie }}
                //     >
                //         <img
                //             className="h-96 rounded-t-lg w-full"
                //             src={movie.image.url}
                //             alt="product"
                //         />
                //     </Link>
                //     <div className="px-5 pb-5">
                //         <Link
                //             to={{
                //                 pathname: `/movies/${movie._id}`,
                //             }}
                //             state={{ movie: movie }}
                //         >
                //             <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                //                 {movie.title}
                //             </h5>
                //         </Link>
                //         <div className="flex items-center justify-between mt-3">
                //             <span className="text-3xl font-bold text-gray-900 dark:text-white">
                //                 ${movie.price}
                //             </span>
                //             <Link
                //                 to={{
                //                     pathname: `/movies/${movie._id}`,
                //                 }}
                //                 state={{ movie: movie }}
                //                 className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                //             >
                //                 View
                //             </Link>
                //         </div>
                //     </div>
                // </div>
            ))}
        </>
    );
};

const NotFoundMovies = () => {
    return <p>No se encontraron películas para esta búsqueda</p>;
};

export const MoviesHome = ({ movies }) => {
    const hasMovies = movies?.length > 0;
    return hasMovies ? <ListOfMovies movies={movies} /> : <NotFoundMovies />;
};
