import todoList from "../models/todo_list_models.js";

async function createTask(body) {
  let createTask = new todoList({
    eventId: body.eventId,
    userId: body.userId,
    task: body.task,
  });
  return await createTask.save();
}

async function getTodoList(eventId, userId) {
  let taskList = await todoList.find({ eventId: eventId, userId: userId });
  return taskList;
}

async function deleteTask(taskId) {
  let deletedTask = await todoList.deleteOne({ _id: taskId });
  return deletedTask;
}

export { createTask, getTodoList, deleteTask };
