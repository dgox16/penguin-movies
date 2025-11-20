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
import morgan from "morgan";

const app = express();

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || origin === URL_CLIENT) {
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

app.use(express.json());
app.use(
    fileupload({
        useTempFiles: true,
        tempFileDir: "./upload",
    }),
);
app.use(cookieParser());

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
    morgan(
        ":date[iso] :method :url :status :response-time ms - IP=:remote-addr BODY=:body",
    ),
);

app.use(moviesRoutes);
app.use(userRoutes);
app.use(shoppingCartRoutes);
app.use(orderRoutes);
app.use(purchasesRoutes);

app.use((err, req, res, next) => {
    console.error("[ERROR]", err.message);
    res.status(500).json({ success: false, message: "Internal error" });
});

export default app;
