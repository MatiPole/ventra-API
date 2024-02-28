import express from "express";
import verifyToken from "../middlewares/auth.js";
import {
  createTicket,
  findTickets,
  checkEventToDelete,
  deleteTicket,
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

//Verificar evento a eliminar
route.get("/checkEventToDelete/:eventId", verifyToken, (req, res) => {
  checkEventToDelete(req.params.eventId)
    .then((hasTickets) => {
      res.json({ hasTickets });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

route.delete("/:ticketId", verifyToken, (req, res) => {
  let result = deleteTicket(req.params.ticketId);
  result.then((deleted) => {
    res.json(deleted);
  });
});

export default route;
