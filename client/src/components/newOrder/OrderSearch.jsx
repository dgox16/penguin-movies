import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

export const OrderSearch = ({ moviesInSelect, updateMoviesSelect }) => {
    const selectionHandler = (id) => {
        updateMoviesSelect(id);
    };
    return (
        <div className="flex justify-center">
            <Autocomplete
                className="w-96"
                size="sm"
                label="Search a movie"
                onSelectionChange={(e) => {
                    selectionHandler(e);
                }}
            >
                {moviesInSelect.map((movie) => (
                    <AutocompleteItem key={movie._id} value={movie._id}>
                        {movie.title}
                    </AutocompleteItem>
                ))}
            </Autocomplete>
        </div>
    );
};
