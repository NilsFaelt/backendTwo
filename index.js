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
    try {
      const id = req.url.split("/");
      const parsedId = JSON.parse(id[2]);
      const todos = readFile("todos.json");
      const parsedTodos = JSON.parse(todos);

      const todo = parsedTodos.filter((todo) => todo.id === parsedId);
      stringyFiedTodo = JSON.stringify(todo, null, 2);
      res.writeHead(200, {
        "Content-Type": "application/json",
        data: "single todo recieved sucessfully",
      });

      res.end(stringyFiedTodo);
    } catch (err) {
      console.log(`something went wrong in getsingle todo ${err}`);
    }
  } else if (req.method === "GET") {
    try {
      const todos = readFile("todos.json");
      res.writeHead(200, {
        "Content-Type": "application/json",
        data: "todo recieved sucessfully",
      });

      res.end(JSON.stringify(todos, null, 2));
    } catch (err) {
      console.log(`something went wrong in get todo ${err}`);
    }
  } else if (req.method === "POST") {
    try {
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
    } catch (err) {
      console.log(`something went wrong in post ${err}`);
    }
  } else if (req.method === "DELETE") {
    try {
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
    } catch (err) {
      console.log(`something went wrong in delete post ${err}`);
    }
  } else if (req.method === "PUT") {
    try {
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
      // todo[0].id = Math.random(Math.floor() * 1000);
      console.log(todo);
      filteredTodos.push(todo[0]);

      stringyFiedTodo = JSON.stringify(filteredTodos, null, 2);

      writeFile("todos.json", stringyFiedTodo);

      res.writeHead(204, {
        "Content-Type": "application/json",
        data: "updated sucessfully",
      });
      res.end();
    } catch (err) {
      console.log(`Something went wrong  in put ${err}`);
    }
  } else if (req.method === "PATCH") {
    try {
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
      res.end();
    } catch (err) {
      console.log(`Something went wrong  in patch ${err}`);
    }
  }
});

app.listen(port, () => {
  console.log(`Server listening on ${port} `);
});
