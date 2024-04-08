import Movie from "../models/Movie.js";
import Orders from "../models/Orders.js";
import { ObjectId } from "mongodb";

export const newOrder = async (req, res) => {
    const { id } = req.user;

    const movies = req.body.map((m) => {
        return {
            ...m,
            movie: new ObjectId(m.movie),
        };
    });

    movies.forEach(async (movie) => {
        await Movie.findByIdAndUpdate(
            movie.movie,
            { $inc: { stock: movie.quantity } },
            {
                new: true,
            },
        );
    });

    const newOrder = new Orders({ user: new ObjectId(id), movies });
    const order = await newOrder.save();

    const { _id, movies: moviesOrder, createdAt } = order;
    const moviesFormatted = moviesOrder.map((movie) => {
        const { _id, title } = movie.movie;
        return {
            id: _id,
            title,
            quantity: movie.quantity,
        };
    });
    res.json({
        id: _id,
        user: req.user.username,
        movies: moviesFormatted,
        createdAt: createdAt,
    });
};

export const getAllOrders = async (_req, res) => {
    const orders = await Orders.find().populate("movies.movie").populate("user");

    const ordersFormatted = orders.map((item) => {
        const { _id, user, movies, createdAt } = item;
        const moviesFormatted = movies.map((item) => {
            const { _id, title } = item.movie;
            return {
                id: _id,
                title,
                quantity: item.quantity,
            };
        });

        return {
            id: _id,
            user: user.username,
            movies: moviesFormatted,
            createdAt: createdAt,
        };
    });

    res.json(ordersFormatted);
};
