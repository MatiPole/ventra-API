import express from "express";
import verifyToken from "../middlewares/auth.js";
import {
  createCalendarDate,
  getCalendarDateList,
  deleteCalendarDate,
  updateCalendarDateStatus,
  updateCalendarDate,
} from "../controllers/calendar_date_controller.js";
const route = express.Router();

//CREAR EVENTO DE CALENDARIO
route.post("/", verifyToken, async (req, res) => {
  try {
    const createNewCalendarDate = await createCalendarDate(req.body);
    res.json({ createNewCalendarDate });
  } catch (err) {
    res
      .status(400)
      .json({ error: err.message || "Error creatin date calendar" });
  }
});

//TRAER TODOS LOS EVENTOS DE CALENDARIO
route.get("/:eventId/:userId", verifyToken, (req, res) => {
  let result = getCalendarDateList(req.params.eventId, req.params.userId);
  result
    .then((todoList) => {
      res.json(todoList);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//ELIMINAR EVENTO DE CALENDARIO
route.delete("/:taskId", verifyToken, (req, res) => {
  let result = deleteCalendarDate(req.params.taskId);
  result
    .then((deletedTask) => {
      res.json(deletedTask);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//MODIFICAR STATUS DEL EVENTO DE CALENDARIO
route.patch("/:taskId", (req, res) => {
  let result = updateCalendarDateStatus(req.params.taskId);
  result
    .then((task) => {
      res.json(task);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});

//EDITAR EVENTO DE CALENDARIO
route.patch("/edit/:calendarDateId", (req, res) => {
  let result = updateCalendarDate(req, req.params.calendarDateId);
  result
    .then((value) => {
      res.json({
        value,
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

export default route;
