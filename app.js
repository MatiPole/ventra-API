import express from "express";
import mongoose from "mongoose";
import users from "./routes/users.js";
import events from "./routes/events.js";
import auth from "./routes/auth.js";
import path from "path";
import cors from "cors";
import "dotenv/config";

mongoose
  .connect(process.env.CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch(() => {
    console.log("Error al conectarse a la base de datos");
  });

const app = express();
const __dirname = path.resolve();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", users);
app.use("/auth", auth);
app.use("/events", events);
app.get("/", function (req, res) {
  res.sendFile("./html/index.html", { root: __dirname });
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log("Server running...");
});

const cors = require("cors");

app.use(cors({ origin: "http://localhost:5174" }));
