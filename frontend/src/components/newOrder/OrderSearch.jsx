import { Autocomplete, AutocompleteItem } from "@heroui/react";

export const OrderSearch = ({ moviesInSelect, updateMoviesSelect }) => {
    const selectionHandler = (id) => {
        updateMoviesSelect(id);
    };
    return (
        <div className="flex justify-center mb-5">
            <Autocomplete
                className="w-96"
                size="sm"
                label="Search a movie"
                onSelectionChange={(e) => {
                    selectionHandler(e);
                }}
            >
                {moviesInSelect.map((movie) => (
                    <AutocompleteItem key={movie.id} value={movie.id}>
                        {movie.title}
                    </AutocompleteItem>
                ))}
            </Autocomplete>
        </div>
    );
};
