import Movie from "../models/Movie.js";
import Purchase from "../models/Purchase.js";
import ShoppingCart from "../models/ShoppingCart.js";
import { ObjectId } from "mongodb";

export const getShoppingCart = async (req, res) => {
    try {
        const shoppingCart = await ShoppingCart.findById(req.user.shoppingCart).populate(
            "movies.movie",
        );
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
    });

    const movies = shoppingCart.movies.map((movie) => {
        return {
            movie: movie.movie,
            quantity: movie.quantity,
        };
    });

    const newPurchase = new Purchase({ user: req.user.id, movies });
    const purchase = await newPurchase.save();

    const shoppingCartModified = await ShoppingCart.findByIdAndUpdate(
        req.user.shoppingCart,
        { movies: [] },
        { new: true },
    );

    res.json(purchase);
};

export const getAllPurchases = async (req, res) => {
    const purchase = await Purchase.find().populate("movies.movie").populate("user");
    res.json(purchase);
};
