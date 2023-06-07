import axios from "axios";
import { useEffect, useState } from "react";

export const Home = () => {
    const [movies, setMovies] = useState([]);
    const getMovies = async () => {
        const movies = await axios.get("http://localhost:4000/api/movies");
        setMovies(movies.data);
    };

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <div>
            {movies.map((movie) => (
                <p>{movie.title}</p>
            ))}
        </div>
    );
};
