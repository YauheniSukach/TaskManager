import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  assigne: { type: String },
  name: { type: String, required: true },
  title: { type: String },
  text: { type: String, required: true },
  color: { type: String },
  status: { type: String },
  state: { type: String },
  createdAt: { type: Date },
  progress: { type: String },
  closed: { type: Number },
  type: { type: String },
  estimate: { type: String },
  startProgressAt: { type: Date },
});

module.exports = mongoose.model('tasks', TaskSchema);
