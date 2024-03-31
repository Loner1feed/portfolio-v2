// TODO:
// Make GET request with filter by category and pagination


import express, { Express, Request, Response } from "express";
import router from "./routes";

const port = process.env.PORT || '3002';
const app = express();

// use routes
app.use('/', router);

// start server
app.listen(port, () => console.log(`Server started at http://localhost:${port}`));

export default app;