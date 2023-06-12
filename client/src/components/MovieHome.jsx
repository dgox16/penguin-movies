import { Link } from "react-router-dom";

const ListOfMovies = ({ movies }) => {
    return (
        <>
            {movies.map((movie) => (
                <div
                    key={movie._id}
                    className="my-8 rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300 hover:-translate-y-1"
                >
                    <Link
                        to={{
                            pathname: `/movies/${movie._id}`,
                        }}
                        state={{ movie: movie }}
                    >
                        <figure>
                            <img
                                src={movie.image.url}
                                className="rounded-t h-96 w-full object-cover"
                                alt="https://pbs.twimg.com/media/C5OTOt3UEAAExIk.jpg"
                            />
                            <figcaption className="p-4">
                                <p className="text-lg mb-4 font-bold leading-relaxed text-gray-800 dark:text-gray-300">
                                    {movie.title}
                                </p>
                                <small className="leading-5 text-gray-500 dark:text-gray-400">
                                    {movie.year} - ${movie.price} - {movie.stock}
                                </small>
                            </figcaption>
                        </figure>
                    </Link>
                    ;
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
