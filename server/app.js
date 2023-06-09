import express from "express";
import moviesRoutes from "./routes/movies.routes.js";
import userRoutes from "./routes/user.routes.js";
import shoppingCartRoutes from "./routes/shoppingCart.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);
app.use(cookieParser());
app.use(moviesRoutes);
app.use(userRoutes);
app.use(shoppingCartRoutes);

export default app;
