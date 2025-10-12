import { Router } from "express";
import { adminRequired } from "../middleware/checkUser.js";
import { getMovies, saveMovie } from "../controllers/movies.controller.js";

const router = Router();

router.get("/movies", getMovies);
router.post("/movies", adminRequired, saveMovie);

export default router;
