import axios from "axios";
import { useEffect, useState } from "react";

export const Home = () => {
    const [movies, setMovies] = useState([]);
    const getMovies = async () => {
        const movies = await axios.get("http://localhost:4000/api/movies", {
            withCredentials: true,
        });
        setMovies(movies.data);
    };

    useEffect(() => {
        getMovies();
        // const userLogged
    }, []);

    return (
        <div>
            {movies.map((movie) => (
                <p key={movie._id}>{movie.title}</p>
            ))}
        </div>
    );
};
