import Movie from "../models/Movie.js";
import Purchase from "../models/Purchase.js";
import ShoppingCart from "../models/ShoppingCart.js";
import { ObjectId } from "mongodb";

export const getShoppingCart = async (req, res) => {
    const shoppingCart = await ShoppingCart.findById(req.user.shoppingCart).populate(
        "movies.movie",
    );
    const shoppingCartFormatted = shoppingCart.movies.map((item) => {
        const { _id, title, price, stock } = item.movie;

        return {
            id: _id,
            title,
            price,
            stock,
            quantity: item.quantity,
        };
    });
    res.json(shoppingCartFormatted);
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
        await Movie.findByIdAndUpdate(
            movie.movie,
            { $inc: { stock: -movie.quantity } },
            { new: true },
        );
    });

    const movies = shoppingCart.movies.map((movie) => {
        return {
            movie: movie.movie,
            quantity: movie.quantity,
        };
    });

    const newPurchase = new Purchase({ user: req.user.id, movies });
    await newPurchase.save();

    await ShoppingCart.findByIdAndUpdate(
        req.user.shoppingCart,
        { movies: [] },
        { new: true },
    );

    res.json({ status: "The shopping cart has been purchased." });
};
