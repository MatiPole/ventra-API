import express from "express";
import mongoose from "mongoose";
import users from "./routes/users.js";
import events from "./routes/events.js";
import tickets from "./routes/tickets.js";
import wishlist from "./routes/wishlist.js";
import categories from "./routes/categories.js";
import mercadopago from "./routes/mercadopago.js";
import resell from "./routes/resell.js";
import todoList from "./routes/todoList.js";
import calendarDate from "./routes/calendarDate.js";
import auth from "./routes/auth.js";
import path from "path";
import cors from "cors";
import analytic from "./routes/analytics.js";
import "dotenv/config";

mongoose
  .connect(process.env.CONNECT /* "mongodb://127.0.0.1:27017/ventradb" */, {
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
app.use("/analytics", analytic);
app.use("/auth", auth);
app.use("/events", events);
app.use("/tickets", tickets);
app.use("/wishlist", wishlist);
app.use("/categories", categories);
app.use("/mercadopago", mercadopago);
app.use("/resell", resell);
app.use("/todoList", todoList);
app.use("/calendarDate", calendarDate);
app.get("/", function (req, res) {
  res.send("./html/index.html", { root: __dirname });
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log("Server running...");
});
