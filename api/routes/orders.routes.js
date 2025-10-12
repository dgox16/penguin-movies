import { Router } from "express";
import { getAllOrders, newOrder } from "../controllers/orders.controllers.js";
import { adminRequired } from "../middleware/checkUser.js";

const router = Router();

router.post("/order/new", adminRequired, newOrder);
router.get("/order", adminRequired, getAllOrders);

export default router;
