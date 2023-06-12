import { Router } from "express";
import { newOrder } from "../controllers/orders.controllers.js";
import { authRequired } from "../middleware/checkUser.js";

const router = Router();

router.post("/api/order/new", authRequired, newOrder);

export default router;
