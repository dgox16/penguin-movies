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
            // Verificar si el origen coincide con el dominio permitido
            if (origin === urlFrontend) {
                // Permitir acceso solo para el dominio permitido
                callback(null, true);
            } else {
                // Bloquear la solicitud CORS para cualquier otro origen
                callback(new Error("Acceso no permitido para este origen"), false);
            }
        },
        // methods: ["GET", "POST", "PUT", "DELETE"],
        // allowedHeaders: ["Content-Type", "Authorization"],
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
