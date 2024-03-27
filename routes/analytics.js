import express from "express";
import { getQuantityEntries } from "../controllers/analytics_controller.js";

const route = express.Router();

route.get("/:id", async (req, res) => {
  const eventId = req.params.id;
  try {
    const { eventName, ticketsTotal, ticketsSold, sumEventPrice } =
      await getQuantityEntries(eventId);
    res.json({
      name: eventName,
      ticketsAvailable: ticketsTotal,
      ticketsSold: ticketsSold,
      totalAmount: sumEventPrice,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default route;
