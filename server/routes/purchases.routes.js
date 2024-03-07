import { Router } from "express";
import { authRequired } from "../middleware/checkUser.js";
import { getAllPurchases } from "../controllers/purchases.controller.js";

const router = Router();

router.get("/api/purchases/", authRequired, getAllPurchases);

export default router;
