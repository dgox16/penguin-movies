import { encryptPassword } from "../libs/passwordHash.js";
import ShoppingCart from "../models/ShoppingCart.js";
import User from "../models/User.js";

export const createUser = async (req, res) => {
    const { username, password, firstName, lastName, isAdmin } = req.body;
    const passwordHash = await encryptPassword(password);
    const newUser = new User({ username, password: passwordHash, firstName, lastName, isAdmin });
    const user = await newUser.save();
    const newShoppingCart = new ShoppingCart({ user: user._id, movies: [] });
    const shoppingCart = await newShoppingCart.save();
    console.log(shoppingCart);
    res.json(user);
};
