const Task = require('../models/task');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id }).sort({ dueDate: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, userId: req.user._id });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    res.json(task);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
