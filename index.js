const http = require("http");
const fs = require("fs");
const { readFile, writeFile } = require("./readWriteFunctions.js");
const port = 4000;

const app = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PATCH, DELETE, OPTIONS, POST, PUT"
  );

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
  }

  if (req.method === "GET") {
    const todos = readFile("todos.json");
    res.statusCode = 200;
    res.end(JSON.stringify(todos));
  }
  if (req.method === "GET") {
    //   with id
  }
  if (req.method === "POST") {
    const todos = readFile("todos.json");
    const parsedTodos = JSON.parse(todos);
    req.on("data", (chunk) => {
      const data = JSON.parse(chunk);
      const todo = {
        name: data,
        id: Math.random(Math.floor() * 1000),
        done: null,
      };
      parsedTodos.push(todo);
      const stringyFiedTodo = JSON.stringify(parsedTodos, null, 2);
      writeFile("todos.json", stringyFiedTodo);
    });

    res.statusCode = 201;
    res.end();
  }
  if (req.method === "DELETE") {
    const todos = readFile("todos.json");
  }
  if (req.method === "PUT") {
  }
  if (req.method === "PATCH") {
  }
});

app.listen(port, () => {
  console.log(`Server listening on ${port} `);
});
