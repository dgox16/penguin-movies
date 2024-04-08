import { Router } from "express";
import { getAllOrders, newOrder } from "../controllers/orders.controllers.js";
import { adminRequired } from "../middleware/checkUser.js";

const router = Router();

router.post("/api/order/new", adminRequired, newOrder);
router.get("/api/order", adminRequired, getAllOrders);

export default router;
