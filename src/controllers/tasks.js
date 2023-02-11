const { Router } = require("express");
const { models } = require("../models");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { createTaskMiddleware } = require("../middlewares/createTaskMiddleware");

const router = Router();

router.get("/", authMiddleware, async (req, res) => {
  const { Task } = models;
  const tasks = await Task.findAll({
    where: {
      user_id: req.user.id,
    },
  });
  return res.status(200).send(tasks);
});

router.post("/", authMiddleware, createTaskMiddleware, async (req, res) => {
  const { Task } = models;
  const { title, description, content, priority, start_time, progress, status, user_id } = req.body;
  const task = await Task.create({
    title,
    description,
    content,
    priority,
    start_time,
    progress,
    status: status,
    progress: progress,
    user_id: user_id,
  });
  return res.status(201).send(task);
});

router.get("/:id", authMiddleware, async (req, res) => {
  const { Task } = models;
  const { id } = req.params;
  const task = await Task.findOne({
    where: {
      id: id,
    },
  });
  if (!task) {
    return res.status(404).send("タスクが存在しない");
  }

  return res.status(200).send(task);
});

router.put("/:id", authMiddleware, createTaskMiddleware, async (req, res) => {
  const { Task } = models;
  const { id } = req.params;
  const { title, description, content, priority, start_time, progress, status } = req.body;
  const task = await Task.findOne({
    where: {
      id,
    },
  });
  if (!task) {
    return res.status(404).send("タスクが存在しない");
  }
  task.title = title;
  task.description = description;
  task.content = content;
  task.priority = priority;
  task.start_time = start_time
  task.status = status;
  task.progress = progress;
  await task.save();
  return res.status(200).send(task);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const { Task } = models;
  const { id } = req.params;
  const task = await Task.findOne({
    where: {
      id,
    },
  });
  if (!task) {
    return res.status(404).send("タスクが存在しない");
  }
  await task.destroy();
  return res.status(200).send("タスクが削除された");
});

router.get("/chart/:user_id", authMiddleware, createTaskMiddleware, async (req, res) => {
  const { Task } = models;
  const tasks = await Task.findAll({where: {
    user_id: req.params.user_id
  }});

  res.json({tasks});
})

module.exports = router;
