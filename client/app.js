//Selectors:
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
// const filterOption = document.querySelector(".filter-todo");

//Event Listeners:
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
// filterOption.addEventListener("click", filterTodo);

//Functions:

//GET TODO:
function getTodos() {
  try {
    fetch("/api/todos/")
      .then((res) => res.json())
      .then((data) => {
        let todoArray = data.data;
        // console.log(data.data[0].todo);
        todoArray.forEach((item) => {
          //Create todo DIV:
          const todoDiv = document.createElement("div");
          todoDiv.classList.add("todo");

          //Create todo LI:
          const newTodo = document.createElement("li");
          newTodo.setAttribute("id", `${item._id}`);
          newTodo.innerText = item.todo;
          newTodo.classList.add("todo-item");
          todoDiv.appendChild(newTodo);

          //Check COMPLETE button:
          // const completedButton = document.createElement("button");
          // completedButton.innerText = "Complete";
          // completedButton.classList.add("complete-btn");
          // todoDiv.appendChild(completedButton);

          //Check DELETE button:
          const deleteButton = document.createElement("button");
          deleteButton.setAttribute("id", `${item._id}`);
          deleteButton.innerText = "Delete";
          deleteButton.classList.add("delete-btn");
          todoDiv.appendChild(deleteButton);

          //Append to list:
          todoList.appendChild(todoDiv);
        });
      });
  } catch (error) {
    console.log(`Catch block, GET error on /api/todos/: ${error}`);
  }
}

//POST TODO:
function addTodo(event) {
  event.preventDefault();

  let value = todoInput.value;
  console.log("TODO", value);
  try {
    fetch("/api/todos/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: value }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        //Create todo DIV:
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //Create todo LI:
        const newTodo = document.createElement("li");
        newTodo.innerText = todoInput.value;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        //Check COMPLETE button:
        // const completedButton = document.createElement("button");
        // completedButton.innerText = "Complete";
        // completedButton.classList.add("complete-btn");
        // todoDiv.appendChild(completedButton);

        //Check DELETE button:
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);

        //Append to list:
        todoList.appendChild(todoDiv);

        //Clear todo input value:
        todoInput.value = "";
      });
  } catch (error) {
    console.log(`Catch block, POST error on /api/todos/: ${error}`);
  }
}

function deleteTodo(event) {
  const item = event.target;
  const id = event.target.id;

  // console.log(item.id)
  try {
    fetch(`/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      // .then((res) => res.json())
      .then((data) => {
        if (item.classList[0] === "delete-btn") {
          const todoDiv = item.parentElement;
          todoDiv.remove();
        }
        console.log("Deleted");
      });
  } catch (error) {
    console.log(`Catch block, DELETE error on /api/todos/:id: ${error}`);
  }
}

//Delete/Complete todo:
// function editTodo(event) {
//   const item = event.target;
//   //Delete todo:
//   if (item.classList[0] === "delete-btn") {
//     const todo = item.parentElement;
//     todo.remove();
//   }
//   //Complete todo:
//   // if (item.classList[0] === "complete-btn") {
//   //   const todo = item.parentElement;
//   //   todo.classList.toggle("completed");
//   // }
// }

//Filter todo:
// function filterTodo(event) {
//   const todos = todoList.childNodes;
//   todos.forEach(function (todo) {
//     switch (event.target.value) {
//       case "all":
//         todo.style.display = "flex";
//         break;
//       case "completed":
//         if (todo.classList.contains("completed")) {
//           todo.style.display = "flex";
//         } else {
//           todo.style.display = "none";
//         }
//         break;
//       case "incomplete":
//         if (!todo.classList.contains("completed")) {
//           todo.style.display = "flex";
//         } else {
//           todo.style.display = "none";
//         }
//         break;
//     }
//   });
// }
