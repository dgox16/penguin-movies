import { SECRET } from "../envConfig.js";
import { comparePassword, encryptPassword } from "../libs/passwordHash.js";
import ShoppingCart from "../models/ShoppingCart.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const getUsers = async (_req, res) => {
    const users = await User.find().populate("shoppingCart");
    res.json(users);
};

export const register = async (req, res) => {
    const { username, password, firstName, lastName } = req.body;
    const passwordHash = await encryptPassword(password);

    const userFound = await User.findOne({ username });

    if (userFound) {
        return res.status(401).json(["This username already exist"]);
    }

    const newShoppingCart = new ShoppingCart({ movies: [] });
    await newShoppingCart.save();
    const newUser = new User({
        username,
        password: passwordHash,
        firstName,
        lastName,
        isAdmin: false,
        shoppingCart: newShoppingCart._id,
    });
    console.log(newUser);
    const user = await newUser.save();
    const userForToken = {
        id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
    };

    const token = jwt.sign(userForToken, SECRET, {
        expiresIn: 60 * 60 * 24 * 7,
    });

    res.cookie("token", token);
    res.send({
        name: user.firstName,
        username: user.username,
        isAdmin: user.isAdmin,
        token,
    });
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const passwordCorrect =
        user == null ? false : await comparePassword(user.password, password);

    if (!passwordCorrect) {
        return res.status(401).json(["Invalid user or password"]);
    }
    const userForToken = {
        id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
    };

    const token = jwt.sign(userForToken, SECRET, {
        expiresIn: 60 * 60 * 24 * 7,
    });

    console.log(token);

    res.cookie("token", token);
    res.send({
        name: user.firstName,
        username: user.username,
        isAdmin: user.isAdmin,
        token,
    });
};

export const verify = async (req, res) => {
    const { token } = req.cookies;

    console.log(token);

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(token, SECRET, async (err, user) => {
        if (err) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const userFound = await User.findById(user.id);
        if (!userFound) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        return res.json({
            id: userFound._id,
            username: userFound.username,
            shoppingCart: userFound.shoppingCart,
            isAdmin: userFound.isAdmin,
            token,
        });
    });
};
