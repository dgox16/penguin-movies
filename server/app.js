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

const urlFrontend =
    process.env.NODE_ENV === "production"
        ? "https://penguin-movies-frontend.onrender.com"
        : "http://localhost:5173";

app.use(
    cors({
        origin: (origin, callback) => {
            if (origin === urlFrontend) {
                callback(null, true);
            } else {
                callback(new Error("Acceso no permitido para este origen"), false);
            }
        },
        credentials: true,
    }),
);
app.use(morgan("dev"));
app.use(express.json());
app.use(
    fileupload({
        useTempFiles: true,
        tempFileDir: "./upload",
    }),
);

app.use(cookieParser());

app.use(moviesRoutes);
app.use(userRoutes);
app.use(shoppingCartRoutes);
app.use(orderRoutes);

export default app;
