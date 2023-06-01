import { Router } from "express";
import {
	getMovie,
	getMovies,
	saveMovie,
} from "../controllers/movies.controller.js";

const router = Router();

router.get("/api/movies", getMovies);
router.get("/api/movies/:id", getMovie);
router.post("/api/movies", saveMovie);

export default router;
