import { Router } from "express";
import { authRequired } from "../middleware/checkUser.js";
import {
    buyShoppingCart,
    getAllPurchases,
    getShoppingCart,
    updateShoppingCart,
} from "../controllers/shoppingCart.controller.js";

const router = Router();

router.get("/api/shoppingCart/", authRequired, getShoppingCart);
router.get("/api/purchases/", getAllPurchases);
router.get("/api/shoppingCart/buy", authRequired, buyShoppingCart);
router.put("/api/shoppingCart/", authRequired, updateShoppingCart);

export default router;
