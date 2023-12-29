import express from "express";
import moviesRoutes from "./routes/movies.routes.js";
import fileupload from "express-fileupload";
import userRoutes from "./routes/user.routes.js";
import orderRoutes from "./routes/orders.routes.js";
import shoppingCartRoutes from "./routes/shoppingCart.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(
    fileupload({
        useTempFiles: true,
        tempFileDir: "./upload",
    }),
);
app.use(
    cors({
        origin: "https://penguin-movies-frontend.onrender.com",
        // origin: "http://localhost:5173",
        credentials: true,
    }),
);
app.use(cookieParser());

app.use(moviesRoutes);
app.use(userRoutes);
app.use(shoppingCartRoutes);
app.use(orderRoutes);

export default app;
