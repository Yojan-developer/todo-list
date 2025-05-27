"use strict";
console.clear();

// importando express
const express = require("express");
// importando las funciones del modulo routes/routes.js
const {
  sendStaticsFiles,
  getAllTasksRoute,
  saveTaskRoute,
  updateTaskRoute,
  deleteTaskRoute,
} = require("./routes/routes");

// instanciando express (app)
const app = express();

// usando middleware express.json
app.use(express.json());

// usando middleware express.static
app.use(express.static("./public"));

// invocando las funciones de routes
sendStaticsFiles(app, "./public/index.html");

getAllTasksRoute(app);

saveTaskRoute(app);

updateTaskRoute(app);

deleteTaskRoute(app);

// activando el servidor
app.listen(3000, () =>
  console.log("----------------------\nserver on port " + 3000 + "\n----------------------")
);
