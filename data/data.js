"use strict";

const sqlite = require("sqlite3");

const db = new sqlite.Database("./tasks.db", sqlite.OPEN_READWRITE, (err) => {
  if (err) console.log(`Ha ocurrido un error: ${err}`);
  else console.log(`Conexion establecida con la base de datos con éxito`);
});

// esta funcion extrae todas las tareas de la base de datos
// no recive nada
// retorna un array con las tareas
async function getAllTasks() {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM tasks`;
    const tasks = [];
    db.all(query, (err, row) => {
      if (err) {
        console.log("Ha oucrrido un error: " + err);
        return reject(err);
      }

      if (row && row.length >= 1) {
        for (let i = 0; i < row.length; i++) {
          const task = {
            id: row[i].task_id,
            name: row[i].task_name,
            time: row[i].task_time,
            completed: row[i].task_completed,
            createdAt: row[i].task_created_at,
            priority: row[i].task_priority,
            description: row[i].task_description,
            updatedAt: row[i].task_updated_at,
          };

          tasks.push(task);
        }

        resolve(tasks);
      }
    });
  });
}

// esta funcion inserta una nueva tarea en la base de datos
// recibe un objeto TaskToCreate
// retorna false en caso de error y true en caso contrerio
function createTask(t) {
  return new Promise((resolve, reject) => {
    let query2 = `INSERT INTO tasks(
           task_id,
           task_name,
           task_time,
           task_completed,
           task_created_at,
           task_updated_at,
           task_priority,
           task_description) VALUES(?,?,?,?,?,?,?,?)`;

    db.run(
      query2,
      [
        t.id,
        t.name,
        t.time,
        t.completed,
        t.createdAt,
        t.updatedAt,
        t.priority,
        t.description,
      ],
      (err) => {
        if (err) {
          console.log(`Ha ocurrido un error: ${err}`);
          return reject(false);
        } else resolve(true);
      }
    );
  });
}

// esta funcion actualiza una tarea en la base de datos
// recibe un objeto TaskToUpdate
// retorna false en caso de error y true en caso contrario
function updateTask(t) {
  return new Promise((resolve, reject) => {
    let query = `UPDATE tasks 
               SET task_name = ?,
                   task_time = ?,
                   task_completed = ?,
                   task_updated_at = ?,
                   task_priority = ?,
                   task_description = ?
                WHERE task_id = ?`;

    db.run(
      query,
      [
        t.name,
        t.time,
        t.completed,
        t.updatedAt,
        t.priority,
        t.description,
        t.id,
      ],
      (err) => {
        if (err) {
          console.log(`Ha ocurrido un error al actualizar la tarea: ${err}`);
          return reject(false);
        } else {
          resolve(true);
        }
      }
    );
  });
}

// esta funcion elimina una tarea de la base de datos
// recibe un objeto TaskToCreate y la funcion extrae el id
// retorna false en caso de error y true en caso contrario
function deleteTask(t) {
  return new Promise((resolve, reject) => {
    let query = `DELETE FROM tasks WHERE task_id = ?`;

    db.run(query, [t.id], (err) => {
      if (err) {
        console.log(`Ha oucrrido un error: ${err}`);

        return reject(false);
      } else {
        resolve(true);
      }
    });
  });
}

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
