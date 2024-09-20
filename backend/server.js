import { config } from "dotenv";
import connectDB from "./src/database/connectDB.js";

import { app } from "./src/app.js";
config();
connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
