import Select from "react-select";

export const OrderSearch = ({ moviesInSelect, updateMoviesSelect }) => {
    return (
        <div className="mr-2 text-black">
            <div className="dropdown-container">
                <Select
                    options={moviesInSelect.map((movie) => {
                        return {
                            value: movie._id,
                            label: movie.title,
                        };
                    })}
                    placeholder="Search a Movie"
                    value={""}
                    onChange={updateMoviesSelect}
                    isSearchable={true}
                />
            </div>
        </div>
    );
};
