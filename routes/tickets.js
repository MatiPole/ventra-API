import express from "express";
import verifyToken from "../middlewares/auth.js";
import {
  createTicket,
  findTickets,
  checkEventToDelete,
  deleteTicket,
  updateTicket,
  findSoldTickets,
  transferTicket,
  changeTicketsToAvaible,
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

//Búsqueda por id del evento
route.get("/soldTickets/:id", verifyToken, (req, res) => {
  let result = findSoldTickets(req.params.id);
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

route.patch("/:ticketId", verifyToken, (req, res) => {
  let result = updateTicket(req, req.params.ticketId);
  result.then((ticket) => {
    res.json(ticket);
  });
});

route.patch("/transfer/:ticketId", verifyToken, (req, res) => {
  let result = transferTicket(req, req.params.ticketId);
  result.then((ticket) => {
    res.json(ticket);
  });
});

route.patch("/removeResell/:eventId", (req, res) => {
  let result = changeTicketsToAvaible(req.params.eventId);
  result
    .then((numberOfTicketsModified) => {
      res.json({ success: true, numberOfTicketsModified });
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err.message });
    });
});

route.delete("/:ticketId", verifyToken, (req, res) => {
  let result = deleteTicket(req.params.ticketId);
  result.then((deleted) => {
    res.json(deleted);
  });
});

export default route;
