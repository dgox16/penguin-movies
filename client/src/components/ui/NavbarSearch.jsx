import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useMoviesStore } from "../../store/movies";
import { useNavigate } from "react-router-dom";

export const NavbarSearch = () => {
    const { movies } = useMoviesStore();
    const navigate = useNavigate();

    const selectionHandler = (id) => {
        if (id !== null) {
            navigate(`/movies/${id}`, { replace: true });
        }
    };

    return (
        <Autocomplete
            size="sm"
            label="Search a movie"
            onSelectionChange={selectionHandler}
            className="ax-w-xs w-[160px]"
        >
            {movies.map((movie) => (
                <AutocompleteItem key={movie._id} value={movie._id}>
                    {movie.title}
                </AutocompleteItem>
            ))}
        </Autocomplete>
    );
};
