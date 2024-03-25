import Tickets from "../models/tickets_models.js";

async function createTicket(body) {
  try {
    let checkTimestamp = await findTimestamp(body.timestamp);

    if (checkTimestamp.length === 0) {
      let ticket = new Tickets({
        eventId: body.eventId,
        userId: body.userId,
        eventName: body.eventName,
        eventVenue: body.eventVenue,
        eventDate: body.eventDate,
        eventTime: body.eventTime,
        eventPrice: body.eventPrice,
        status: body.status,
        timestamp: body.timestamp,
      });
      ticket.createdAt = Date.now();
      return await ticket.save();
    } else {
      throw new Error("Ya existe un ticket con el mismo timestamp.");
    }
  } catch (error) {
    console.error("Error al crear el ticket:", error);
    throw new Error("Error al crear el ticket.");
  }
}

async function findTimestamp(timestamp) {
  let ticket = await Tickets.find({ timestamp: timestamp });
  return ticket;
}

async function findTickets(id) {
  let event = await Tickets.find({ userId: id });
  return event;
}

async function findSoldTickets(id) {
  let event = await Tickets.find({ eventId: id });
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

async function updateTicket(req, id) {
  let ticket = await Tickets.updateOne(
    { _id: id },
    { $set: { state: req.body.state } }
  );
  return ticket;
}

async function transferTicket(req, id) {
  let ticket = await Tickets.updateOne(
    { _id: id },
    { $set: { userId: req.body.userId } }
  );
  return ticket;
}

async function deleteTicket(ticketId) {
  let ticket = await Tickets.deleteOne({ _id: ticketId });
  return ticket;
}

export {
  createTicket,
  findTickets,
  checkEventToDelete,
  deleteTicket,
  updateTicket,
  findSoldTickets,
  transferTicket,
};
