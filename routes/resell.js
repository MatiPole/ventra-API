import express from "express";
import verifyToken from "../middlewares/auth.js";
import {
  publishToResell,
  getResellList,
  deleteReselledTicket,
  deleteBoughtResellTicket,
  removeAllEventResaleTickets,
} from "../controllers/resell_controller.js";
const route = express.Router();

route.post("/", verifyToken, async (req, res) => {
  try {
    const ticketToResell = await publishToResell(req.body);
    res.json({ ticketToResell });
  } catch (err) {
    res.status(400).json({ error: err.message || "Error publishing ticket" });
  }
});

route.get("/:eventId", verifyToken, (req, res) => {
  let result = getResellList(req.params.eventId);
  result
    .then((resellTickets) => {
      res.json(resellTickets);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

route.delete("/:resellId", verifyToken, (req, res) => {
  let result = deleteReselledTicket(req.params.resellId);
  result
    .then((deletedTicket) => {
      res.json(deletedTicket);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

route.delete("/bought/:resellId", verifyToken, (req, res) => {
  let result = deleteBoughtResellTicket(req.params.resellId);
  result
    .then((deletedTicket) => {
      res.json(deletedTicket);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

route.delete("/removeAll/:eventId", verifyToken, (req, res) => {
  let result = removeAllEventResaleTickets(req.params.eventId);
  result
    .then((deletedTickets) => {
      res.json(deletedTickets);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

export default route;
