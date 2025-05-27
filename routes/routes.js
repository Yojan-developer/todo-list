"use strict";

// importando las funciones del modulo data/data.js
const {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
} = require("../data/data");

// esta funcion envia los archivos estaticos al navegador
// recive la instancia de express y el archivo HTML
// no retorna nada
function sendStaticsFiles(app, file) {
  app.get("/", (_, res) => {
    res.sendFile(file, { root: __dirname });
  });
}

// esta funcion redirecciona a una ruta la cual retorna todas las tareas que trae la funcion getAllTasks
// recibe una instancia de express (app)
// es una funcion vacia no retorna nada
function getAllTasksRoute(app) {
  app.get("/get-all", async (_, res) => {
    // obteniendo el array de tareas
    const tasks = await getAllTasks();

    // oredenando el array de tareas de forma decendente en funcion a la prioridad
    tasks.sort((a, b) => {
      if (parseInt(a.priority) > parseInt(b.priority)) {
        return -1;
      }

      if (parseInt(b.priority) > parseInt(a.priority)) {
        return 1;
      }

      return 0;
    });

    // enviando el array ordenado al front
    res.json({
      tasks: tasks,
    });
  });
}

// esta funcion redirecciona a una ruta la cual recibe una tarea como body y se la pasa a la funcion createTask
// recibe una instancia de express (app)
// es una funcion vacia no retorna nada
function saveTaskRoute(app) {
  app.post("/create", async (req, res) => {
    // obteniendo el resultado
    const results = await createTask(req.body);

    // validando el resultado
    if (results == false) {
      res.json({
        res: "Error al crear la tarea",
        code: 500,
      });
    } else
      res.json({
        res: "tarea creada con éxito",
        code: 200,
      });
  });
}

// esta funcion redirecciona a una ruta que recibe una TaskToUpdate y se la pasa a la funcion updateTask
// recibe una instancia de express (app)
// es una funcion vacia no retorna nada
function updateTaskRoute(app) {
  app.post("/update", async (req, res) => {
    // obteniendo el resultado
    const results = await updateTask(req.body);

    // validando el resultado
    if (results == false) {
      res.json({
        res: "Error al actualizar la tarea",
        code: 500,
      });
    } else {
      res.json({
        res: "tarea actualizada con exito",
        code: 200,
      });
    }
  });
}

// esta funcion redirecciona a una ruta la cual recibe una TaskToCreate y se la pasa a la funcion deleteTask
// recibe una instancia de express (app)
// es una funcion vacia no retorna nada
function deleteTaskRoute(app) {
  app.post("/delete", async (req, res) => {
    // obteniendo el resultado
    const results = await deleteTask(req.body);

    // validando el resultado
    if (results == false) {
      res.json({
        res: "Error al eliminar la tarea",
        code: 500,
      });
    } else {
      res.json({
        res: "tarea eliminada con exito",
        code: 200,
      });
    }
  });
}

// exportando las funciones de este modulo
module.exports = {
  sendStaticsFiles,
  getAllTasksRoute,
  saveTaskRoute,
  updateTaskRoute,
  deleteTaskRoute,
};
