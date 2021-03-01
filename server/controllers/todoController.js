const Todo = require("../models/todoModel.js");

//Get all todos
//Route = GET /api/todos
exports.getTodos = async (req, res) => {
  // res.send("GET Todos");
  try {
    const todos = await Todo.find();
    return res.status(200).json({
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    return res.status(400).send("getTodos ERROR: " + error);
  }
};

//Add a todo
//Route = POST /api/todos
exports.addTodo = async (req, res) => {
  // res.send("POST Stock");
  try {
    const { todo } = req.body;
    const todoAdd = await Todo.create({ todo });
    return res.status(200).json({
      data: todoAdd,
    });
  } catch (error) {
    return res.status(400).send("addTodo ERROR: " + error);
  }
};

//Delete a todo
//Route = DELETE /api/todos/:id
exports.deleteTodo = async (req, res) => {
  // res.send("DELETE Stock");
  try {
    const todoDelete = await Todo.findById(req.params.id);
    if (!todoDelete) {
      return res.status(404).send("No todo found!");
    }
    await todoDelete.remove();
    console.log("in delete controller");
    return res.status(200).send("Deleted Todo: " + todoDelete.todo);
  } catch (error) {
    return res.status(400).send("deleteTodo ERROR: " + error);
  }
};
