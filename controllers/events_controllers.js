import Events from "../models/events_models.js";

//Se buscan todas las bandas con status true.
async function eventsList() {
  let events = await Events.find({ status: true, visibility: "public" });
  return events;
}

async function userEventsList(userId) {
  let events = await Events.find({ userId: userId });
  return events;
}

async function findEvent(id) {
  let event = await Events.find({ _id: id });
  return event;
}

async function createEvent(req) {
  let event = new Events({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    date: req.body.date,
    time: req.body.time,
    venue: req.body.venue,
    zone: req.body.zone,
    image: req.body.image,
    ticketCount: req.body.ticketCount,
    visibility: req.body.visibility,
    category: req.body.category,
    isFree: req.body.isFree,
    termsAndConditions: req.body.termsAndConditions,
    userId: req.body.userId,
    status: true,
  });
  return await event.save();
}

async function updateEvent(body, id) {
  let event = await Events.updateOne(
    { _id: id },
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        date: req.body.date,
        time: req.body.time,
        venue: req.body.venue,
        zone: req.body.zone,
        image: req.body.image,
        ticketCount: req.body.ticketCount,
        visibility: req.body.visibility,
        category: req.body.category,
        isFree: req.body.isFree,
        userId: req.body.userId,
        status: true,
      },
    }
  );
  return event;
}

async function deleteEvent(id) {
  let event = await Events.deleteOne({ _id: id });
  return event;
}

async function findByName(name) {
  let event = await Events.find({ name: name });
  return event;
}

async function filterCategory(category) {
  let event = await Events.find({ category: category });
  return event;
}

async function orderByPrice() {
  /*   let event = await Events.find().sort({ nombre: 1 });
  return event; */
}

async function limitEvents(page, limit) {
  const pages = parseInt(page);
  const limits = parseInt(limit);
  const skip = (pages - 1) * limits;
  const events = await Events.find().limit(limits).skip(skip);
  return events;
}

export {
  eventsList,
  userEventsList,
  findEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  findByName,
  filterCategory,
  orderByPrice,
  limitEvents,
};
