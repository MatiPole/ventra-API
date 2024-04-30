import Events from "../models/events_models.js";
import fs from "fs";

//Se buscan todas las bandas con status true.
async function eventsList(amount, skip) {
  let events = await Events.find({ status: true, visibility: "public" })
    .limit(amount)
    .skip(skip);
  return events;
}

async function allEventsList() {
  let events = await Events.find({
    status: true,
    approve: "approve",
    visibility: "public",
  });
  return events;
}

async function getFeaturedEvents() {
  let events = await Events.find({
    status: true,
    featured: true,
  });
  return events;
}

async function allEventsAdminList() {
  let events = await Events.find();
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

async function createEvent(req, coverUrl) {
  let image = coverUrl;

  let event = new Events({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    date: req.body.date,
    time: req.body.time,
    venue: req.body.venue,
    address: req.body.address,
    zone: req.body.zone,
    cover: image,
    ticketCount: req.body.ticketCount,
    visibility: req.body.visibility,
    category: req.body.category,
    isFree: req.body.isFree,
    termsAndConditions: req.body.termsAndConditions,
    userId: req.body.userId,
    status: req.body.status,
    approve: "pending",
  });

  return await event.save();
}

async function updateEvent(req, id, coverUrl) {
  try {
    let updateFields = {};

    // Agregar campos no nulos a updateFields
    if (req.body.name) updateFields.name = req.body.name;
    if (req.body.description) updateFields.description = req.body.description;
    if (req.body.price) updateFields.price = req.body.price;
    if (req.body.date) updateFields.date = req.body.date;
    if (req.body.time) updateFields.time = req.body.time;
    if (req.body.venue) updateFields.venue = req.body.venue;
    if (req.body.address) updateFields.address = req.body.address;
    if (req.body.zone) updateFields.zone = req.body.zone;
    if (coverUrl !== null) {
      updateFields.cover = coverUrl;
      try {
        const event = await Events.findById(id);
        if (event) {
          await deleteFile(event.cover);
        }
      } catch (err) {
        res.status(400).send(err + "Error al eliminar foto del evento");
      }
    }
    if (req.body.ticketCount) updateFields.ticketCount = req.body.ticketCount;
    if (req.body.visibility) updateFields.visibility = req.body.visibility;
    if (req.body.category) updateFields.category = req.body.category;
    if (req.body.userId) updateFields.userId = req.body.userId;
    if (req.body.status) updateFields.status = req.body.status;

    let event = await Events.updateOne({ _id: id }, { $set: updateFields });

    return event;
  } catch (error) {
    throw error;
  }
}
//Aprobar los eventos
async function updateEventApprove(req, id) {
  try {
    return await Events.updateOne(
      { _id: id },
      { $set: { approve: req.body.approve } }
    );
  } catch (error) {
    throw error;
  }
}

//Actualizar eventos destacados
async function updateEventFeatured(req, id) {
  try {
    // Contar el número de eventos destacados
    const countFeaturedEvents = await Events.countDocuments({ featured: true });
    const featured = req.body.featured;
    // Verificar si el número de eventos destacados alcanzó el límite
    if (countFeaturedEvents >= 5 && featured) {
      throw new Error("Se ha alcanzado el máximo de eventos destacados");
    }

    return await Events.updateOne(
      { _id: id },
      { $set: { featured: req.body.featured } }
    );
  } catch (error) {
    throw error;
  }
}

async function deleteEvent(id) {
  try {
    const event = await Events.findById(id);
    if (event) {
      await deleteFile(event.cover);
      await Events.deleteOne({ _id: id });
    }
    return event;
  } catch (err) {
    res.status(400).send(err + "Error al eliminar el evento");
  }
}

const deleteFile = async (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      // Eliminar el archivo
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    // Manejar el error si el archivo no existe o hay otros problemas
    console.error(`Error al eliminar el archivo ${filePath}`);
  }
};

async function findByName(name) {
  let nameInsensitive = "(?i)" + name;
  let event = await Events.find({
    name: { $regex: nameInsensitive },
    visibility: "public",
    status: true,
  });
  return event;
}

async function filterGeneral(
  category = null,
  zone = null,
  minPrice = 0,
  maxPrice
) {
  const filters = [
    { category: category },
    { zone: zone },
    { price: [minPrice, maxPrice] },
  ];
  const finalFilters = [];
  filters.map((filter) => {
    const objectKeys = Object.keys(filter)[0];
    const objectValues = Object.values(filter)[0];
    if (
      objectValues !== null &&
      objectValues !== undefined &&
      (objectKeys == "zone" ||
        objectKeys == "category" ||
        objectKeys == "price") &&
      objectValues !== ""
    ) {
      if (objectKeys === "price") {
        finalFilters.push({ price: { $gte: minPrice, $lte: maxPrice } });
      } else {
        finalFilters.push({ [objectKeys]: objectValues });
      }
    }
  });
  let event = await Events.find({
    status: true,
    approve: "approve",
    visibility: "public",
    $and: finalFilters,
  });
  return event;
}

async function limitEvents(page, limit) {
  const pages = parseInt(page);
  const limits = parseInt(limit);
  const skip = (pages - 1) * limits;
  const events = await Events.find({
    status: true,
    approve: "approve",
    visibility: "public",
  })
    .limit(limits)
    .skip(skip);
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
  allEventsList,
  userEventsList,
  findEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  findByName,
  limitEvents,
  updateTickets,
  filterGeneral,
  allEventsAdminList,
  updateEventApprove,
  getFeaturedEvents,
  updateEventFeatured,
};
