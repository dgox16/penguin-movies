import fs from "fs-extra";
import { uploadImage } from "../libs/cloudinary.js";
import Movie from "../models/Movie.js";

export const getMovies = async (_req, res) => {
    try {
        const movies = await Movie.find();
        const formattedMovies = movies.map((movie) => {
            const { _id, __v, ...rest } = movie.toObject();
            return { id: _id, ...rest };
        });
        res.json(formattedMovies);
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
    const { title, year, rating, description, price, stock } = req.body;
    let image = {};

    if (req.files?.image) {
        const result = await uploadImage(req.files.image.tempFilePath);
        await fs.remove(req.files.image.tempFilePath);
        image = {
            url: result.secure_url,
            public_id: result.public_id,
        };
    }
    const newMovie = new Movie({ title, year, image, rating, description, price, stock });
    const movie = await newMovie.save();
    const { _id, ...rest } = movie.toObject();
    const formattedMovie = { id: _id, ...rest };
    res.json(formattedMovie);
};

export const getMoviesByWord = async (req, res) => {
    try {
        const { word } = req.query;
        const movies = await Movie.find({ title: { $regex: word, $options: "i" } });
        res.json(movies);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
