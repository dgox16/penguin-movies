import fs from "fs-extra";
import { uploadImage } from "../libs/cloudinary.js";
import Movie from "../models/Movie.js";

export const getMovies = async (_req, res) => {
    try {
        const movies = await Movie.find();
        console.info(movies);
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
    const { title, year, price, stock } = req.body;
    let image = {};

    if (req.files?.image) {
        const result = await uploadImage(req.files.image.tempFilePath);
        await fs.remove(req.files.image.tempFilePath);
        image = {
            url: result.secure_url,
            public_id: result.public_id,
        };
    }
    const newMovie = new Movie({ title, year, image, price, stock });
    const movie = await newMovie.save();
    res.json(movie);
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
