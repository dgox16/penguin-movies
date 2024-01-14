import Movie from "../models/Movie.js";
import Orders from "../models/Orders.js";
import { ObjectId } from "mongodb";

export const newOrder = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(400).send({ error: "You are not an admin" });
    }

    const { id } = req.user;

    const movies = req.body.map((m) => {
        return {
            ...m,
            movie: new ObjectId(m.movie),
        };
    });

    movies.forEach(async (movie) => {
        const modifiedPost = await Movie.findByIdAndUpdate(
            movie.movie,
            { $inc: { stock: movie.quantity } },
            {
                new: true,
            },
        );
        console.log(modifiedPost);
    });

    const newOrder = new Orders({ user: new ObjectId(id), movies });

    const order = await newOrder.save();
    res.json(order);
};

export const getAllOrders = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(400).send({ error: "You are not an admin" });
    }
    const orders = await Orders.find().populate("movies.movie").populate("user");
    res.json(orders);
};
