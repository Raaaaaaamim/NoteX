import { config } from "dotenv";
import { app } from "./src/app.js";
import connectDB from "./src/database/connectDB.js";

config();
connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
