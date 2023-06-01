import ShoppingCart from "../models/ShoppingCart.js";
import { ObjectId } from "mongodb";

export const getShoppingCart = async (req, res) => {
    const shoppingCart = await ShoppingCart.findById(req.params.id);
    res.json(shoppingCart);
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
