import { Router } from "express";
import { adminRequired } from "../middleware/checkUser.js";
import { getAllPurchases } from "../controllers/purchases.controller.js";

const router = Router();

router.get("/api/purchases/", adminRequired, getAllPurchases);

export default router;
