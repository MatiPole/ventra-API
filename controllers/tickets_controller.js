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
  return await ticket.save();
}

async function findTickets(id) {
  let event = await Tickets.find({ userId: id });
  return event;
}

export { createTicket, findTickets };
