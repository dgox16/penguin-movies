import { Router } from "express";
import { authRequired } from "../middleware/checkUser.js";
import { getMovie, getMovies, saveMovie } from "../controllers/movies.controller.js";

const router = Router();

router.get("/api/movies", authRequired, getMovies);
router.get("/api/movies/:id", getMovie);
router.post("/api/movies", saveMovie);

export default router;
