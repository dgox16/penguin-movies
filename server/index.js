import app from "./app.js";
import { connectedDB } from "./db.js";
import { PORT } from "./envConfig.js";

connectedDB();

app.listen(PORT, () => {
	console.log("Server in port", PORT);
});
