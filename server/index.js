import app from "./app.js";
import { connectedDb } from "./db.js";
import { PORT } from "./envConfig.js";

connectedDb();

app.listen(PORT, () => {
    console.info("Server in port", PORT);
});
