import { Router } from "express";
import {
    login,
    logout,
    register,
    verify,
} from "../controllers/users.controller.js";
import { authRequired } from "../middleware/checkUser.js";

const router = Router();

router.post("/user/register", register);
router.post("/user/login", login);
router.get("/auth/verify", verify);
router.get("/auth/logout", authRequired, logout);

export default router;
