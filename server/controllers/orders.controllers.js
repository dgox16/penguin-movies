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

    const order = new Orders({ user: new ObjectId(id), movies });
    res.json(order);
};
