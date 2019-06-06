import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  title: { type: String, required: true },
  department: { type: String, required: true},
  assignTasks: { type: Array },
  closedTasks: { type: Array },
  reopenedTasks: { type: Number },
  resolvedTasks: { type: Number },
  completedOnTime: { type: Number },
  completedNotOnTime: { type: Number },
  status: { type: Boolean },
  createdAt: { type: Date }
});


module.exports = mongoose.model('users', UserSchema);
