import { MoviesHome } from "../components/home/MovieHome";
import { useMoviesStore } from "../store/movies";

export const Home = () => {
    const { movies } = useMoviesStore();

    return (
        <section className="bg-gray-100 dark:bg-gray-900 py-10 flex justify-center">
            <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 w-3/4">
                <MoviesHome movies={movies} />
            </div>
        </section>
    );
};
