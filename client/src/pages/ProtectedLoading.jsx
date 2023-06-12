import { useMovies } from "../context/MoviesContext";

export const ProtectedLoading = ({ children }) => {
    const { loadingMovies, loadingSC } = useMovies();

    if (loadingMovies || loadingSC) {
        return <h1>Loading</h1>;
    }
    return <div>{children}</div>;
};
