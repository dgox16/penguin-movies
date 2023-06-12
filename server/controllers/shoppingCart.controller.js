import Movie from "../models/Movie.js";
import ShoppingCart from "../models/ShoppingCart.js";
import { ObjectId } from "mongodb";

export const getShoppingCart = async (req, res) => {
    try {
        const shoppingCart = await ShoppingCart.findById(req.user.shoppingCart).populate(
            "movies.movie",
        );
        console.log(shoppingCart);
        res.json(shoppingCart);
    } catch (_error) {
        res.status(400).send({ error: "id used is malformed" });
    }
};

export const updateShoppingCart = async (req, res) => {
    const movies = req.body.map((m) => {
        return {
            ...m,
            movie: new ObjectId(m.movie),
        };
    });

    const shoppingCartModified = await ShoppingCart.findByIdAndUpdate(
        req.user.shoppingCart,
        { movies },
        { new: true },
    );
    console.log(shoppingCartModified);
    res.json(shoppingCartModified);
};

export const buyShoppingCart = async (req, res) => {
    const shoppingCart = await ShoppingCart.findById(req.user.shoppingCart);
    shoppingCart.movies.forEach(async (movie) => {
        const modifiedPost = await Movie.findByIdAndUpdate(
            movie.movie,
            { $inc: { stock: -movie.quantity } },
            {
                new: true,
            },
        );
        console.log(modifiedPost);
    });

    const shoppingCartModified = await ShoppingCart.findByIdAndUpdate(
        req.user.shoppingCart,
        { movies: [] },
        { new: true },
    );

    res.json(shoppingCartModified);
};
