import express from "express";
import verifyToken from "../middlewares/auth.js";
import {
  createTicket,
  findTickets,
} from "../controllers/tickets_controller.js";
const route = express.Router();

route.post("/", verifyToken, async (req, res) => {
  try {
    const ticket = await createTicket(req.body);
    res.json({ ticket });
  } catch (err) {
    res.status(400).json({ error: err.message || "Error creating ticket" });
  }
});

//Búsqueda por id del usuario
route.get("/:id", verifyToken, (req, res) => {
  let result = findTickets(req.params.id);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

export default route;
