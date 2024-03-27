import Tickets from "../models/tickets_models.js";
import Event from "../models/events_models.js";

async function getQuantityEntries(eventId) {
  try {
    // Evento por ID
    const evento = await Event.findById(eventId);
    const eventName = evento.name;
    const ticketsTotal = evento.ticketCount;

    // Cantidad de tickets vendidos para el evento
    const ticketsSold = await Tickets.countDocuments({ eventId: eventId });

    // Suma de todos los tickets
    const totalMoney = await Tickets.aggregate([
      { $match: { eventId: eventId } }, // Filtrar por eventId
      { $group: { _id: null, total: { $sum: "$eventPrice" } } }, // Sumar los precios de los tickets
    ]);

    // Valor total de los precios de todos los tickets
    const sumEventPrice = totalMoney.length > 0 ? totalMoney[0].total : 0;

    return { eventName, ticketsTotal, ticketsSold, sumEventPrice };
  } catch (error) {
    throw new Error(
      "Error al obtener la cantidad de entradas: " + error.message
    );
  }
}

export { getQuantityEntries };
