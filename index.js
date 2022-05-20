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

  if (req.method === "GET" && req.url.split("/")[1] === "singletodo") {
    const id = req.url.split("/");
    const parsedId = JSON.parse(id[2]);
    const todos = readFile("todos.json");
    const parsedTodos = JSON.parse(todos);

    const todo = parsedTodos.filter((todo) => todo.id === parsedId);
    stringyFiedTodo = JSON.stringify(todo);
    res.writeHead(200, {
      "Content-Type": "application/json",
      data: "recieved sucessfully",
    });

    res.end(stringyFiedTodo);
  } else if (req.method === "GET") {
    const todos = readFile("todos.json");

    res.writeHead(200, {
      "Content-Type": "application/json",
      data: "single todo recieved sucessfully",
    });

    res.end(JSON.stringify(todos));
  } else if (req.method === "POST") {
    const todos = readFile("todos.json");
    const parsedTodos = JSON.parse(todos);
    req.on("data", (chunk) => {
      const data = JSON.parse(chunk);
      const todo = {
        name: data,
        id: Math.random(Math.floor() * 1000),
        done: false,
      };
      parsedTodos.push(todo);
      const stringyFiedTodo = JSON.stringify(parsedTodos, null, 2);
      writeFile("todos.json", stringyFiedTodo);
    });
    res.writeHead(201, {
      "Content-Type": "application/json",
      data: "posted sucessfully",
    });

    res.end();
  } else if (req.method === "DELETE") {
    const id = req.url.split("/");
    const parsedId = JSON.parse(id[1]);
    const todos = readFile("todos.json");
    const parsedTodos = JSON.parse(todos);
    const filteredParsedTodos = parsedTodos.filter((todo) => {
      return todo.id !== parsedId;
    });
    const stringyFiedTodo = JSON.stringify(filteredParsedTodos, null, 2);
    writeFile("todos.json", stringyFiedTodo);
    res.writeHead(204, {
      "Content-Type": "application/json",
      data: "deleted sucessfully",
    });

    res.end();
  } else if (req.method === "PUT") {
    const id = req.url.split("/");
    const parsedId = JSON.parse(id[1]);
    const todos = readFile("todos.json");
    const parsedTodos = JSON.parse(todos);

    let todo = parsedTodos.filter((todo) => {
      return todo.id === parsedId;
    });
    let filteredTodos = parsedTodos.filter((todo) => {
      return todo.id !== parsedId;
    });
    todo[0].done = null;
    todo[0].name = "Madri Gale";
    todo[0].id = Math.random(Math.floor() * 1000);
    console.log(todo);
    filteredTodos.push(todo[0]);

    stringyFiedTodo = JSON.stringify(filteredTodos, null, 2);

    writeFile("todos.json", stringyFiedTodo);

    res.writeHead(204, {
      "Content-Type": "application/json",
      data: "updated sucessfully",
    });
  } else if (req.method === "PATCH") {
    const id = req.url.split("/");
    const parsedId = JSON.parse(id[1]);
    const todos = readFile("todos.json");
    const parsedTodos = JSON.parse(todos);

    let todo = parsedTodos.filter((todo) => {
      return todo.id === parsedId;
    });
    let filteredTodos = parsedTodos.filter((todo) => {
      return todo.id !== parsedId;
    });
    todo[0].done = true;

    filteredTodos.push(todo[0]);

    stringyFiedTodo = JSON.stringify(filteredTodos, null, 2);

    writeFile("todos.json", stringyFiedTodo);

    res.writeHead(204, {
      "Content-Type": "application/json",
      data: "updated sucessfully",
    });
  }

  res.end();
});

app.listen(port, () => {
  console.log(`Server listening on ${port} `);
});
