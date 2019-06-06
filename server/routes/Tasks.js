const express = require("express");
const tasks = express.Router();
const cors = require("cors");

const Task = require("../models/Task");
tasks.use(cors());

tasks.post('/create', (req, res) => {
  const taskData = {
    assigne: req.body.assigne,
    name: req.body.name,
    title: req.body.title,
    text: req.body.text,
    color: req.body.color,
    status: req.body.status,
    state: req.body.state,
    createdAt: new Date(),
    progress: req.body.progress,
    closed: req.body.closed,
    type: req.body.type,
    estimate: req.body.estimate,
    startProgressAt: req.body.startProgressAt,
  };

  Task.findOne({
    name: req.body.name,
  })
    .then(task => {
      if (!task) {
        Task.create(taskData)
          .then(task => {
            res.json({ status: task.name + 'created!' });
          })
          .catch(err => {
            res.send('error:' + err);
          })
      } else {
        res.json({ error: 'Task with this name already exist' });
      }
		})
    .catch(err => {
      res.send('error:' + err);
    });
});

tasks.get('/all-tasks', (req, res) => {
  Task.find().then(data => {
    if (data) {
      res.send(data)
    } else {
      res.json({ error: "Tasks does not exist" });
    }
  })
  .catch(err => {
    res.send("error:" + err);
  });
});

tasks.delete('/all-tasks/:id', (req, res) => {
  Task.findById(req.params.id).remove()
    .then(data => res.send(data))
    .catch(err => {
      res.json("error:" + err);
    });
});

tasks.put('/all-tasks/:id', (req, res) => {
  Task.findByIdAndUpdate(req.params.id, req.body)
    .then(data => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(400).json({ error: "Task does not exist" });
      };
    })
    .catch(err => {
      res.status(400).json({ error: "Task does not exist" });
    });
});

module.exports = tasks;
