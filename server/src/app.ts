import express from "express";
import cors from "cors";
import router from "./routes";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || "3002";
const app = express();

//use cors
app.use(cors());

// use routes
app.use("/", router);

// start server
app.listen(port, () =>
  console.log(`Server started at http://localhost:${port}`)
);

export default app;
