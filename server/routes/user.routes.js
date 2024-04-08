import { Router } from "express";
import { login, logout, register, verify } from "../controllers/users.controller.js";
import { authRequired } from "../middleware/checkUser.js";

const router = Router();

router.post("/api/user/register", register);
router.post("/api/user/login", login);
router.get("/api/auth/verify", verify);
router.get("/api/auth/logout", authRequired, logout);

export default router;
