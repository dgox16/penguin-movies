import { MoviesHome } from "../components/MovieHome";
import { useMovies } from "../context/MoviesContext";

export const Home = () => {
    const { movies } = useMovies();

    return (
        <section className="bg-gray-100 dark:bg-gray-900 py-10 px-12">
            <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6">
                <MoviesHome movies={movies} />
            </div>
        </section>
    );
};
