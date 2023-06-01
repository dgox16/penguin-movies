import express from "express";
import moviesRoutes from "./routes/movies.routes.js";
import userRoutes from "./routes/user.routes.js";
import shoppingCartRoutes from "./routes/shoppingCart.routes.js";
const app = express();

app.use(express.json());
app.use(moviesRoutes);
app.use(userRoutes);
app.use(shoppingCartRoutes);

export default app;
