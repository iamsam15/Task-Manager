import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "node:fs";
import connect from "./src/db/connect.js";
import cookieParser from "cookie-parser";
import errorHandler from "./src/helpers/errorHandler.js";
dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// errorhandler middleware
app.use(errorHandler);

// Routes
const routeFiles = fs.readdirSync("./src/routes");

routeFiles.forEach((file) => {
  import(`./src/routes/${file}`)
    .then((route) => {
      app.use("/api/v1", route.default);
    })
    .catch((err) => {
      console.log("Failed to load route files", err);
    });
});

const server = async () => {
  try {
    await connect();
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.log("Failed to start Server...", error.message);
    process.exit(1);
  }
};
server();
