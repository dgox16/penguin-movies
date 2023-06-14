import { Router } from "express";
import { getAllOrders, newOrder } from "../controllers/orders.controllers.js";
import { authRequired } from "../middleware/checkUser.js";

const router = Router();

router.post("/api/order/new", authRequired, newOrder);
router.get("/api/order", getAllOrders);

export default router;
