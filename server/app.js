import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import fileupload from "express-fileupload";
import morgan from "morgan";
import moviesRoutes from "./routes/movies.routes.js";
import orderRoutes from "./routes/orders.routes.js";
import shoppingCartRoutes from "./routes/shoppingCart.routes.js";
import userRoutes from "./routes/user.routes.js";
import purchasesRoutes from "./routes/purchases.routes.js";

const app = express();

const urlFrontend =
	process.env.NODE_ENV === "production"
		? "https://client-production-d073.up.railway.app"
		: "http://localhost:5173";

app.use(
	cors({
		origin: (origin, callback) => {
			if (origin == urlFrontend) {
				callback(null, true);
			} else {
				callback(new Error("Acceso no permitido para este origen"), false);
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
app.use(purchasesRoutes);

export default app;
