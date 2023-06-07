import { Router } from "express";
import { checkUser } from "../middleware/checkUser.js";
import { getMovie, getMovies, saveMovie } from "../controllers/movies.controller.js";

const router = Router();

router.get("/api/movies", getMovies);
router.get("/api/movies/:id", getMovie);
router.post("/api/movies", checkUser, saveMovie);

export default router;
