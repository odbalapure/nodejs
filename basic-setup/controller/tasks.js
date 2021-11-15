const getAllTasks = (req, res) => {
  res.send("Send all tasks");
}

const createTask = (req, res) => {
  res.send("Create a task");
}

const getTask = (req, res) => {
  res.send("Get a single task");
}

const updateTask = (req, res) => {
  res.send("Update a task");
}

const deletTask = (req, res) => {
  res.send("Delete a task");
}

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deletTask
};