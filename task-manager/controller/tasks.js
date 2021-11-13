const asyncWrapper = require("../middleware/async");
const Task = require("../models/Task");
const { createCustomError } = require("../errors/custom-error");

/* Get all tasks */
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res
    .status(200)
    .json({ status: "success", data: { tasks, nbHits: tasks.length } });
});

/* Create a task */
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

/* Get a single task */
const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  // const task = await Task.findOne({ _id: req.params.id });
  // OR
  const task = await Task.findOne({ _id: taskId });

  if (!task) {
    /* Creating a Error object and passing it to the middleware */
    // const error = new Error("Not found");
    // error.status = 404;
    // return next(error);
    // return res
    //   .status(404)
    //   .json({ msg: `Task with id ${taskId} does not exist!` });

    /* Creating a custom error classs extending the Error class */
    return next(
      createCustomError(`Task with id ${taskId} does not exist!`, 404)
    );
  }

  res.status(200).json({ task });
});

/* Delete a task */
const deletTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });

  if (!task) {
    // return res
    //   .status(404)
    //   .json({ msg: `Task with id ${taskId} does not exist!` });
    next(
      createCustomError(`Task with id ${taskId} does not exist!`, 404)
    );
  }

  // res.status(204).send();
  // OR
  // res.status(204).json({ task: null, status: "success" })
  res.status(204).json({ task });
});

/* Update a task */
const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  // Step 1 - Pass the id
  // Step 2 - Pass the JSON object
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    // Always return new item i.e. updated one
    new: true,
    // Tell mongoose to run the validators
    runValidators: true,
  });

  /* NOTE: The validator for edit won't work, we have to specify to run validators */

  if (!task) {
    // return res
    //   .status(404)
    //   .json({ msg: `Task with id ${taskId} does not exist!` });
    return next(
      createCustomError(`Task with id ${taskId} does not exist!`, 404)
    );
  }

  res.status(202).json({ task });
});

/* NOTE: PUT overwrites the resources and PATCH does a partial update */

/* Update a task */
const editTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    // Step 1 - Pass the id
    // Step 2 - Pass the JSON object
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      // Always return new item i.e. updated one
      new: true,
      // Tell mongoose to run the validators
      runValidators: true,
      //
      overwrite: true,
    });

    /* NOTE: The validator for edit won't work, we have to specify to run validators */

    if (!task) {
      return res
        .status(404)
        .json({ msg: `Task with id ${taskId} does not exist!` });
    }

    res.status(202).json({ task });
  } catch (error) {
    // NOTE: Adding custom error won't show the validation errors
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deletTask,
  editTask,
};
