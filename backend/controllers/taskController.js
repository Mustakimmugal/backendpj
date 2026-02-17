import Task from "../models/Task.js";

export const createTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      user: req.user.id
    });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      user: req.user.id
    });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task)
      return res.status(404).json({ message: "Task not found" });

    if (task.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    task.title = req.body.title || task.title;
    await task.save();

    res.json(task);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task)
      return res.status(404).json({ message: "Task not found" });

    if (task.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
};
