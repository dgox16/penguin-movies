import { Router } from "express";
import { getShoppingCart, updateShoppingCart } from "../controllers/shoppingCart.controller.js";

const router = Router();

router.get("/api/shoppingCart/:id", getShoppingCart);
router.put("/api/shoppingCart/:id", updateShoppingCart);

export default router;
