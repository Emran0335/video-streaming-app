// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js";
import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is listening on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("MONGO db connection failed !!!", err));
/*
import os from "os"
console.log("Operation System: ", os.platform())
console.log("Architecture System: ", os.arch())
console.log("Total Memory System: ", os.totalmem())
console.log("Free Memory System: ", os.freemem())
*/
/*
// if we use node module, we must use the file extention when we want to import that particular file i.e "./constants.js"
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("Error", error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("ERROR", error);
    throw err;
  }
})();
*/
