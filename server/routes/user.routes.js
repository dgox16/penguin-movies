import { Router } from "express";
import User from "../models/User.js";
import { createUser } from "../controllers/users.controller.js";

const router = Router();

router.get("/api/user", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

router.post("/api/user", createUser);

export default router;
