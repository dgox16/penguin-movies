import { Router } from "express";
import { getUsers, login, logout, register } from "../controllers/users.controller.js";

const router = Router();

router.get("/api/user", getUsers);
router.post("/api/user/register", register);
router.post("/api/user/login", login);
router.post("/api/user/logout", logout);

export default router;
