"use strict";

// instanciando la clase Date
const fecha = new Date();
// seleccionando los elementos HTML
const descContent = document.getElementById("desc_content");
const desc = document.getElementById("desc");
const main = document.getElementById("main");
const modalUpdate = document.getElementById("modal_update");
const formUpdate = document.getElementById("form_update");

// creando la clase TaskToCompare
class TaskToCompare {
  constructor(name, time, completed, description, priority, id) {
    this.name = name;
    this.time = time;
    this.completed = completed;
    this.description = description;
    this.priority = priority;
    this.id = id;
  }

  // getters y setters
  setName(name) {
    this.name = name;
  }

  setTime(time) {
    this.time = time;
  }

  setCompleted(completed) {
    this.completed = completed;
  }

  setDesc(desc) {
    this.description = desc;
  }

  setPriority(priority) {
    this.priority = priority;
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }
}

// instanciando la clase TaskToCompare
const taskCompare = new TaskToCompare();

// creando la clase TaskToCreate
class TaskToCreate {
  constructor(
    name,
    time,
    description,
    priority = "0",
    completed = "incompleta",
    createdAt = `${fecha.getDay()}/${fecha.getMonth()}/${fecha.getFullYear()}`,
    updatedAt = "0/0/0",
    id = Date.now()
  ) {
    this.id = id;
    this.name = name;
    this.time = time;
    this.completed = completed;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.priority = priority;
    this.description = description;
  }

  // este metodo crea una tarea y tambien agrega eventListeners a los elementos que lo requieren
  // no recibe nada
  // es un metodo vacio no retorna nada
  createTask() {
    // creando el elemento task y agrgregando los atributos
    const task = document.createElement("div");
    task.classList.add("task");
    const clase = this.id;
    console.log(clase);

    task.id = this.id;
    task.addEventListener("mousemove", (e) => {
      const X = e.clientX;
      const Y = e.clientY;

      task_desc.style.top = `${Y + 10}px`;
      task_desc.style.left = `${X + 10}px`;
      task_desc.style.display = "block";

      if (this.description != "") {
        descContent.textContent = this.description;
      } else if (this.description == "") {
        descContent.textContent = "Esta tarea no tiene descripcion";
      }
    });

    task.addEventListener("mouseleave", (e) => {
      desc.style.display = "none";
    });

    // creando el elemento sec-1 y dandole sus atributos
    const taskSec1 = document.createElement("div");
    taskSec1.classList.add("sec-1");

    // creando el elemento taskName y dandole sus atributos
    const taskName = document.createElement("h2");
    taskName.classList.add("task_name");
    taskName.textContent = this.name;
    taskName.setAttribute("title", "Nombre");
    this.taskName = taskName;

    // creando el elemento taskTime y dandole sus atributos
    const taskTime = document.createElement("p");
    taskTime.classList.add("task_time");
    taskTime.textContent = this.time;
    taskTime.setAttribute("title", "Hora");
    this.taskTime = taskTime;

    // creando el elemento taskCompleted y dandole sus atributos
    const taskCompleted = document.createElement("p");
    taskCompleted.classList.add("task_completed");
    taskCompleted.textContent = this.completed;
    taskCompleted.setAttribute("title", "estado");
    this.taskCompleted = taskCompleted;

    // creando el elemento taskCreatedAt y dandole sus atributos
    const taskCreatedAt = document.createElement("p");
    taskCreatedAt.classList.add("task_created_at");
    taskCreatedAt.textContent = `Creada:  ${this.createdAt}`;
    taskCreatedAt.setAttribute("title", "Creada");

    // creando el elemento taskUpdatedAt y dandole sus atributos
    const taskUpdatedAt = document.createElement("p");
    taskUpdatedAt.classList.add("task_updated_at");
    if (this.updatedAt != "actualizada: 0/0/0")
      taskUpdatedAt.textContent = `actualizada: ${this.updatedAt}`;
    else taskUpdatedAt.textContent = "";
    taskUpdatedAt.setAttribute("title", "Actualizada");

    // creando el elemento taskPriority y dandole sus atributos
    const taskPriority = document.createElement("p");
    taskPriority.classList.add("task_priority");
    taskPriority.textContent = `prioridad: ${this.priority}`;
    taskPriority.setAttribute("title", "prioridad");
    taskPriority.id = "priority";
    this.taskPriority = taskPriority;

    // agregando elementos al elemento sec-1
    taskSec1.append(
      taskName,
      taskTime,
      taskPriority,
      taskCompleted,
      taskCreatedAt,
      taskUpdatedAt
    );

    // creando el elemento sec-2
    const taskSec2 = document.createElement("div");
    taskSec2.classList.add("sec-2");

    // creando el elemento taskUpdateIcon y dandole sus atributos
    const taskUpdateIcon = document.createElement("img");
    taskUpdateIcon.classList.add("task_update_icon");
    taskUpdateIcon.setAttribute(
      "src",
      "https://img.icons8.com/ios/50/edit--v1.png"
    );
    taskUpdateIcon.setAttribute("alt", "editar tarea");
    taskUpdateIcon.setAttribute("title", "Editar");

    // aqui se administran los datos para comparar los datos actuales de la tarea y los datos para actualizar
    taskUpdateIcon.addEventListener("click", (e) => {
      console.log(formUpdate[0].value);

      formUpdate[0].value = this.name;
      formUpdate[1].value = this.calculateFalseTime();
      formUpdate[2].value = this.completed;
      formUpdate[3].value = this.priority;
      formUpdate[4].value = this.description;

      modalUpdate.style.animation = "show_update 0.3s linear";
      modalUpdate.style.display = "flex";

      taskCompare.setName(formUpdate[0].value);
      taskCompare.setTime(this.calculateFalseTime());
      taskCompare.setCompleted(formUpdate[2].value);
      taskCompare.setPriority(formUpdate[3].value);
      taskCompare.setDesc(formUpdate[4].value);
      taskCompare.setId(this.id);

      formUpdate.addEventListener("submit", (e) => {
        e.preventDefault();

        if (
          formUpdate[5].textContent.toLowerCase() == "editar" &&
          formUpdate[4].value.trim() != ""
        ) {
          this.description = formUpdate[4].value;
        }
      });
    });

    // creando el elemento taskDeleteIcon
    const taskDeleteIcon = document.createElement("img");
    taskDeleteIcon.classList.add("task_delete_icon");
    taskDeleteIcon.setAttribute(
      "src",
      "https://img.icons8.com/ios-filled/50/delete--v1.png"
    );

    // aqui se administra la eliminacion de la tarea
    taskDeleteIcon.addEventListener("click", async (e) => {
      const req = await fetch("http://localhost:3000/delete", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(this),
      });

      const res = await req.json();

      if (res.code == 200) {
        main.removeChild(task);
        desc.style.display = "none";
      }
    });

    // agregando elementos asl elemento sec-2
    taskSec2.append(taskDeleteIcon, taskUpdateIcon);

    // agregando sec-1 y sec-2 a la task
    task.append(taskSec1, taskSec2);

    // aqui se administra en que orden se inserta la tarea segun la prioridad
    let inserted = false;
    for (let i = 0; i < main.children.length; i++) {
      const priorityChild = parseInt(
        main.children[i].children[0].children[2].textContent.split(":")[1]
      );

      if (parseInt(this.priority) > priorityChild) {
        main.insertBefore(task, main.children[i]);
        inserted = true;
        break;
      }
    }

    if (inserted == false) {
      main.appendChild(task);
    }

    // aqui se administra que color tendra la tarea tomando como referencia la tarea anterior
    if (task.previousElementSibling !== null) {
      const computedStyle = window.getComputedStyle(
        task.previousElementSibling
      );
      const backgroundColor = computedStyle.backgroundColor;
      console.log(backgroundColor);

      switch (backgroundColor) {
        case "rgb(173, 216, 230)": // lightblue
          task.style.backgroundColor = "rgb(255, 105, 97)"; // salmon
          break;

        case "rgb(255, 105, 97)": // salmon
          task.style.backgroundColor = "rgb(10, 187, 133)"; // seagreen (corregido el primer valor)
          break;

        case "rgb(10, 187, 133)": // seagreen (corregido el primer valor)
          task.style.backgroundColor = "rgb(255, 164, 32)"; // gold
          break;

        case "rgb(255, 164, 32)": // gold
          task.style.backgroundColor = "rgb(173, 216, 230)"; // Vuelve a lightblue (ciclo)
          break;

        default:
          // Si el color anterior no coincide con ninguno de los casos,
          // puedes establecer un color por defecto para la tarea actual.
          task.style.backgroundColor = "rgb(173, 216, 230)";
          break;
      }
    }
  }

  // este metodo agrega la descripcion de la tarea a el elemento que muestra la descripcion al hacer mousemove
  // recive el elemento task
  // es un metodo vacio no retorna nada
  showDesc(t) {
    const descContent = document.getElementById("desc_content");
    t.addEventListener("mousemove", () => {
      if (this.description != "") {
        descContent.textContent = this.description;
        return;
      } else if (this.description == "") {
        descContent.textContent = "esta tarea no tiene descripcion";
      }
    });
  }

  // esta funcion convierte la hora de la tarea a hora militar para cuando se quiera actualizar poder mostrarla
  // no recive nada
  // es un metodo vacio no retorna nada
  calculateFalseTime() {
    const time = this.time.split(":");
    const hour = parseInt(time[0]);
    const minuts = time[1].split(" ")[0];
    const meridiam = time[1].split(" ")[1];

    if (meridiam == "AM") {
      return `0${hour}:${minuts}`;
    } else if (meridiam == "PM") {
      return `${hour + 12}:${minuts}`;
    }
  }
}

// creando la clase TaskToUpdate
class TaskToUpdate {
  constructor(
    name,
    time,
    completed,
    priority,
    description,
    id,
    updatedAt = `${fecha.getDay()}/${fecha.getMonth()}/${fecha.getFullYear()}`
  ) {
    this.id = id;
    this.name = name;
    this.time = time;
    this.completed = completed;
    this.updatedAt = updatedAt;
    this.priority = priority;
    this.description = description;
  }
}
