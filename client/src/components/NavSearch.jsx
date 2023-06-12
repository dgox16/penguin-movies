import React, { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useMovies } from "../context/MoviesContext";

export const NavSearch = () => {
    const [selectedOptions, setSelectedOptions] = useState();
    const { movies } = useMovies();
    const navigate = useNavigate();

    function handleSelect(data) {
        navigate(`../movies/${data.value}`, { replace: true });
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
