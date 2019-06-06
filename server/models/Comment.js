import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  createdAt: {type: Date},
  message: {type: String},
  account:{type: Object},
  taskId:{type: String},
  createdAt:{type: Date},
});

module.exports = mongoose.model('comments', MessageSchema);