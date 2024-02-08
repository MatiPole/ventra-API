import express from "express";
import mongoose from "mongoose";
import users from "./routes/users.js";
import events from "./routes/events.js";
import tickets from "./routes/tickets.js";
import wishlist from "./routes/wishlist.js";
import categories from "./routes/categories.js";
import auth from "./routes/auth.js";
import path from "path";
import cors from "cors";
import "dotenv/config";

mongoose
  .connect(/* process.env.CONNECT */ "mongodb://127.0.0.1:27017/ventradb", {
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

app.use(cors());

const __dirname = path.resolve();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", users);
app.use("/auth", auth);
app.use("/events", events);
app.use("/tickets", tickets);
app.use("/wishlist", wishlist);
app.use("/categories", categories);
app.get("/", function (req, res) {
  res.sendFile("./html/index.html", { root: __dirname });
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log("Server running...");
});
