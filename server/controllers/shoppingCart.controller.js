import ShoppingCart from "../models/ShoppingCart.js";
import { ObjectId } from "mongodb";

export const getShoppingCart = async (req, res) => {
    try {
        const shoppingCart = await ShoppingCart.findById(req.params.id).populate("movies.movie");
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
        req.params.id,
        { movies },
        { new: true },
    );
    res.json(shoppingCartModified);
};
