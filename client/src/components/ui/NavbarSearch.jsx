import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useMoviesStore } from "../../store/movies";
import { useNavigate } from "react-router-dom";

export const NavbarSearch = ({ onClose }) => {
    const { movies } = useMoviesStore();
    const navigate = useNavigate();

    const selectionHandler = (id) => {
        if (id !== null) {
            navigate(`/movies/${id}`, { replace: true });
        }
        onClose();
    };

    return (
        <Autocomplete label="Write your movie..." onSelectionChange={selectionHandler}>
            {movies.map((movie) => (
                <AutocompleteItem key={movie._id} value={movie._id}>
                    {movie.title}
                </AutocompleteItem>
            ))}
        </Autocomplete>
    );
};
