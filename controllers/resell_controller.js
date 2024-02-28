import Resell from "../models/resell_models.js";

async function publishToResell(body) {
  let publishedTicket = new Resell({
    eventId: body.eventId,
    userId: body.userId,
    username: body.username,
    ticketId: body.ticketId,
    ticketPrice: body.ticketPrice,
    status: body.status,
  });
  return await publishedTicket.save();
}

async function getResellList(eventId) {
  let resellList = await Resell.find({ eventId: eventId });
  return resellList;
}

async function deleteReselledTicket(resellId) {
  let deletedTicket = await Resell.deleteOne({ _id: resellId });
  return deletedTicket;
}

export { publishToResell, getResellList, deleteReselledTicket };
