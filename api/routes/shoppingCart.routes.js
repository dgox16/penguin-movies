import { Router } from "express";
import { authRequired } from "../middleware/checkUser.js";
import {
    buyShoppingCart,
    getShoppingCart,
    updateShoppingCart,
} from "../controllers/shoppingCart.controller.js";

const router = Router();

router.get("/shoppingCart/", authRequired, getShoppingCart);
router.get("/shoppingCart/buy", authRequired, buyShoppingCart);
router.put("/shoppingCart/", authRequired, updateShoppingCart);

export default router;
