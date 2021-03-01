const mongoose = require("mongoose");

const todosSchema = new mongoose.Schema({
  todo: {
    type: String,
  },
});

module.exports = mongoose.model("todos", todosSchema);
