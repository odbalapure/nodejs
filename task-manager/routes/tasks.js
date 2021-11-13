const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deletTask,
  editTask
} = require("../controller/tasks");

// Do not require id so we can chain them
router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deletTask).put(editTask);

module.exports = router;
