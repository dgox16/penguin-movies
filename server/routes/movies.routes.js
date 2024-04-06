import { Router } from "express";
import { adminRequired } from "../middleware/checkUser.js";
import { getMovies, saveMovie } from "../controllers/movies.controller.js";

const router = Router();

router.get("/api/movies", getMovies);
router.post("/api/movies", adminRequired, saveMovie);

export default router;
