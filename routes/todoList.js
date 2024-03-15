import express from "express";
import verifyToken from "../middlewares/auth.js";
import {
  createTask,
  getTodoList,
  deleteTask,
} from "../controllers/todo_list_controller.js";
const route = express.Router();

route.post("/", verifyToken, async (req, res) => {
  try {
    const createNewTask = await createTask(req.body);
    res.json({ createNewTask });
  } catch (err) {
    res.status(400).json({ error: err.message || "Error creatin task" });
  }
});

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

export default route;
