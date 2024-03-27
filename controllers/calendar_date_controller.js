import calendarDate from "../models/calendar_date_models.js";

async function createCalendarDate(body) {
  let createDate = new calendarDate({
    userId: body.userId,
    eventId: body.eventId,
    title: body.title,
    description: body.description,
    color: body.color,
    startDate: body.startDate,
    endDate: body.endDate,
    status: true,
  });
  return await createDate.save();
}

async function getCalendarDateList(eventId, userId) {
  let calendarDateList = await calendarDate.find({
    eventId: eventId,
    userId: userId,
  });
  return calendarDateList;
}

async function deleteCalendarDate(calendarDateId) {
  let deletedCalendarDate = await calendarDate.deleteOne({
    _id: calendarDateId,
  });
  return deletedCalendarDate;
}

async function updateCalendarDateStatus(id) {
  let calendarDate = await calendarDate.findById(id); // Busca la evento por su ID
  calendarDate.status = !calendarDate.status;
  await calendarDate.save();
  return calendarDate;
}

async function updateCalendarDate(req, id) {
  try {
    let updateFields = {};

    // Agregar campos no nulos a updateFields
    if (req.body.title) updateFields.title = req.body.title;
    if (req.body.description) updateFields.description = req.body.description;
    if (req.body.color) updateFields.color = req.body.color;
    if (req.body.startDate) updateFields.startDate = req.body.startDate;
    if (req.body.endDate) updateFields.endDate = req.body.endDate;

    let calendarDate = await calendarDate.updateOne(
      { _id: id },
      { $set: updateFields }
    );
    return calendarDate;
  } catch (error) {
    throw error;
  }
}

export {
  createCalendarDate,
  getCalendarDateList,
  deleteCalendarDate,
  updateCalendarDateStatus,
  updateCalendarDate,
};
