import "dotenv/config";
import app from "./src/app.js";
import { connectDb } from "./src/db/db.js";
import { conf } from "./src/conf/conf.js";

const port = conf.PORT || 8000;
connectDb();
app.listen(port, () => {
  console.log("Server is listening on port 3000");
});
