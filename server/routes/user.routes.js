import { Router } from "express";
import { getUsers, login, register, verify } from "../controllers/users.controller.js";

const router = Router();

router.get("/api/user", getUsers);
router.post("/api/user/register", register);
router.post("/api/user/login", login);
router.get("/api/auth/verify", verify);

export default router;
