const express = require("express");
const path = require("path");
const port = process.env.PORT || 3000;
const todos = require("./routes/todos.js");
const connectDB = require("./db.js");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("client"));

app.use("/api/todos", todos);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.listen(3000, () => console.log("Server Running on " + port));
