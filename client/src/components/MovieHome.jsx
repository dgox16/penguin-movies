import { Link } from "react-router-dom";

const ListOfMovies = ({ movies }) => {
    return (
        <>
            {movies.map((movie) => (
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link
                        to={{
                            pathname: `/movies/${movie._id}`,
                        }}
                        state={{ movie: movie }}
                    >
                        <img
                            className="h-96 rounded-t-lg w-full"
                            src={movie.image.url}
                            alt="product"
                        />
                    </Link>
                    <div className="px-5 pb-5">
                        <Link
                            to={{
                                pathname: `/movies/${movie._id}`,
                            }}
                            state={{ movie: movie }}
                        >
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                {movie.title}
                            </h5>
                        </Link>
                        <div className="flex items-center justify-between mt-3">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                ${movie.price}
                            </span>
                            <Link
                                to={{
                                    pathname: `/movies/${movie._id}`,
                                }}
                                state={{ movie: movie }}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                View
                            </Link>
                        </div>
                    </div>
                </div>
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
