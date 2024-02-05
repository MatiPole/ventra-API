import Tickets from "../models/tickets_models.js";

async function createTicket(body) {
  let ticket = new Tickets({
    eventId: body.eventId,
    userId: body.userId,
    eventName: body.eventName,
    eventVenue: body.eventVenue,
    eventDate: body.eventDate,
    eventTime: body.eventTime,
    eventPrice: body.eventPrice,
    status: body.status,
  });
  ticket.createdAt = Date.now();
  return await ticket.save();
}

async function findTickets(id) {
  let event = await Tickets.find({ userId: id });
  return event;
}

async function checkEventToDelete(id) {
  try {
    let tickets = await Tickets.find({ eventId: id });

    // Verifica si hay algún ticket asociado al evento
    if (tickets.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

export { createTicket, findTickets, checkEventToDelete };
