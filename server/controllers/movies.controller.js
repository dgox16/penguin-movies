import Movie from "../models/Movie.js";

export const getMovies = async (_req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
    }
};

export const getMovie = async (req, res) => {
    try {
        const id = req.params.id;
        const movie = await Movie.findById(id);
        res.json(movie);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
    }
};

export const saveMovie = async (req, res) => {
    try {
        const { title, year, imageUrl, price, stock } = req.body;
        const newMovie = new Movie({ title, year, imageUrl, price, stock });
        const movie = await newMovie.save();
        res.json(movie);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
    }
};
