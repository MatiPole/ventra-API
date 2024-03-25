import express from "express";
import verifyToken from "../middlewares/auth.js";
import {
  createTask,
  getTodoList,
  deleteTask,
  updateTaskStatus,
  updateTask,
} from "../controllers/todo_list_controller.js";
const route = express.Router();

//CREAR TASK
route.post("/", verifyToken, async (req, res) => {
  try {
    const createNewTask = await createTask(req.body);
    res.json({ createNewTask });
  } catch (err) {
    res.status(400).json({ error: err.message || "Error creatin task" });
  }
});

//TRAER TODAS LAS TASK DEL EVENTO
route.get("/:eventId/:userId", verifyToken, (req, res) => {
  let result = getTodoList(req.params.eventId, req.params.userId);
  result
    .then((todoList) => {
      res.json(todoList);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//ELIMINAR TASK DEL EVENTO
route.delete("/:taskId", verifyToken, (req, res) => {
  let result = deleteTask(req.params.taskId);
  result
    .then((deletedTask) => {
      res.json(deletedTask);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//MODIFICAR STATUS DE LA TASK PARA COMPLETARLA O PONERLA COMO NO COMPLETA
route.patch("/:taskId", (req, res) => {
  let result = updateTaskStatus(req.params.taskId);
  result
    .then((task) => {
      res.json(task);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});

//EDITAR TASK
route.patch("/edit/:taskId", (req, res) => {
  let result = updateTask(req.params.taskId, req.body.task);
  result
    .then((task) => {
      res.json(task);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});

export default route;
