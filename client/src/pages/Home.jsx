import { MoviesHome } from "../components/home/MovieHome";
import { useMoviesStore } from "../store/movies";

export const Home = () => {
    const { movies } = useMoviesStore();

    return (
        <>
            <section className="mt-3 flex mx-6 justify-center">
                <div className="grid grid-flow-row gap-3 md:gap-4 xl:gap-8 text-neutral-600 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 w-[122ch]">
                    <MoviesHome movies={movies} />
                    {/* {open && (
                    <Overlay close={closeModal} isOpen={open}>
                        <ModalCard close={closeModal} movie={movieSelected} />
                    </Overlay>
                )} */}
                </div>
            </section>
        </>
    );
};
