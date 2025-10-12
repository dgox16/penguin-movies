import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import fileupload from "express-fileupload";
import moviesRoutes from "./routes/movies.routes.js";
import orderRoutes from "./routes/orders.routes.js";
import shoppingCartRoutes from "./routes/shoppingCart.routes.js";
import userRoutes from "./routes/user.routes.js";
import purchasesRoutes from "./routes/purchases.routes.js";
import { URL_CLIENT } from "./envConfig.js";

const app = express();

const urlFrontend = URL_CLIENT;

app.use(
    cors({
        origin: (origin, callback) => {
            if (origin == urlFrontend) {
                callback(null, true);
            } else {
                callback(
                    new Error("Acceso no permitido para este origen"),
                    false,
                );
            }
        },
        credentials: true,
    }),
);
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        res.status(403).json({
            success: false,
            message: err.message,
        });
    } else {
        next();
    }
});

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
app.use(purchasesRoutes);

export default app;
