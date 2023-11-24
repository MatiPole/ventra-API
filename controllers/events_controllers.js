import Events from "../models/events_models.js";

//Se buscan todas las bandas con status true.
async function eventsList(amount, skip) {
  let events = await Events.find({ status: true, visibility: "public" })
    .limit(amount)
    .skip(skip);
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
  let image = "imgs/default-cover-img.jpg";
  if (req.file) {
    image = req.file.path;
  }

  let event = new Events({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    date: req.body.date,
    time: req.body.time,
    venue: req.body.venue,
    zone: req.body.zone,
    cover: image,
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

async function updateEvent(req, id) {
  try {
    let updateFields = {};

    // Agregar campos no nulos a updateFields
    if (req.body.name) updateFields.name = req.body.name;
    if (req.body.description) updateFields.description = req.body.description;
    if (req.body.price) updateFields.price = req.body.price;
    if (req.body.date) updateFields.date = req.body.date;
    if (req.body.time) updateFields.time = req.body.time;
    if (req.body.venue) updateFields.venue = req.body.venue;
    if (req.body.zone) updateFields.zone = req.body.zone;
    if (req.file) updateFields.cover = req.file.path;
    if (req.body.ticketCount) updateFields.ticketCount = req.body.ticketCount;
    if (req.body.visibility) updateFields.visibility = req.body.visibility;
    if (req.body.category) updateFields.category = req.body.category;
    if (req.body.userId) updateFields.userId = req.body.userId;
    updateFields.status = true;

    let event = await Events.updateOne({ _id: id }, { $set: updateFields });

    return event;
  } catch (error) {
    throw error;
  }
}

async function deleteEvent(id) {
  let event = await Events.deleteOne({ _id: id });
  return event;
}

async function findByName(name) {
  let nameInsensitive = "(?i)" + name;
  let event = await Events.find({
    name: { $regex: nameInsensitive },
    visibility: "public",
    status: true,
  });
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

async function updateTickets(id) {
  let event = await Events.updateOne(
    { _id: id },
    {
      $inc: {
        ticketCount: -1,
      },
    }
  );
  return event;
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
  updateTickets,
};
