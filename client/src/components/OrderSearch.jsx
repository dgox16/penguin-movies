import React, { useState } from "react";
import Select from "react-select";
import { useMovies } from "../context/MoviesContext";

export const NavSearch = () => {
    const [selectedOptions, setSelectedOptions] = useState();
    const { movies } = useMovies();

    function handleSelect(data) {
        console.log(data);
        setSelectedOptions(data);
    }
    return (
        <div className="mr-2 text-black">
            <div className="dropdown-container">
                <Select
                    options={movies.map((movie) => {
                        return {
                            value: movie._id,
                            label: movie.title,
                        };
                    })}
                    placeholder="Search a Movie"
                    value={selectedOptions}
                    onChange={handleSelect}
                    isSearchable={true}
                />
            </div>
        </div>
    );
};
