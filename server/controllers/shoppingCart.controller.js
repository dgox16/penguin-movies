import Movie from "../models/Movie.js";
import Purchase from "../models/Purchase.js";
import ShoppingCart from "../models/ShoppingCart.js";
import { ObjectId } from "mongodb";

export const getShoppingCart = async (req, res) => {
    try {
        const shoppingCart = await ShoppingCart.findById(req.user.shoppingCart).populate(
            "movies.movie",
        );
        const shoppingCartFormatted = shoppingCart.movies.map((item) => {
            const { _id, title, price, stock } = item.movie;

            return {
                _id,
                title,
                price,
                stock,
                quantity: item.quantity,
            };
        });
        console.info(shoppingCartFormatted);
        res.json(shoppingCartFormatted);
    } catch (_error) {
        res.status(400).send({ error: "id used is malformed" });
    }
};

[
    {
        movie: {
            image: [Object],
            _id: new ObjectId("6489f4946ad181d5f164e674"),
            title: "Deadpool",
            year: "2017",
            price: 2132,
            stock: 1,
            __v: 0,
        },
        quantity: 1,
        _id: new ObjectId("65a33de88e092676510cedce"),
    },

    {
        movie: {
            image: [Object],
            _id: new ObjectId("6489f4946ad181d5f164ea74"),
            title: "Deadpdasool",
            year: "20s17",
            price: 2132,
            stock: 1,
            __v: 0,
        },
        quantity: 1,
        _id: new ObjectId("65a33de88e092676510cedce"),
    },
];

[
    {
        _id: new ObjectId("6489f4946ad181d5f164e674"),
        title: "Deadpool",
        price: 2132,
        stock: 1,
        quantity: 1,
    },

    {
        _id: new ObjectId("6489f4946ad181d5f164ea74"),
        title: "Deadpdasool",
        price: 2132,
        stock: 1,
        quantity: 1,
    },
];

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
