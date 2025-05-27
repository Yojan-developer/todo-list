"use strict";

// seleccionando los elementos
const task = document.getElementById("task");
const task_desc = document.getElementById("desc");
const modalAdd = document.getElementById("modal_add");
const formAdd = document.getElementById("form_add");
const addBTN = document.getElementById("add");
const modalInfoBack = document.getElementById("modal_info_back");
const modalInfoContent = document.getElementById("modal_info_content");
const modalInfoAcceptBTN = document.getElementById("modal_info_accept");

// creando las tareas a partir de las que vienen del servidor
// esto se hace cuando se dispara el evento load del objeto window
window.addEventListener("load", async (e) => {
  const req = await fetch("http://localhost:3000/get-all");

  const res = await req.json();

  if (res.tasks.length > 0) {
    for (let i = 0; i < res.tasks.length; i++) {
      console.log(res.tasks[i]);

      const task = new TaskToCreate(
        res.tasks[i].name,
        res.tasks[i].time,
        res.tasks[i].description,
        res.tasks[i].priority,
        res.tasks[i].completed,
        res.tasks[i].createdAt,
        res.tasks[i].updatedAt,
        res.tasks[i].id
      );

      task.createTask();
    }
  }
});

addBTN.addEventListener("click", (e) => {
  modalAdd.style.animation = "show_add 0.2s linear";
  modalAdd.style.display = "flex";
});

formAdd.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (e.target[4].textContent == "Cancelar") {
    modalAdd.style.animation = "hide_add 0.3s linear";
    setTimeout(() => {
      modalAdd.style.display = "none";
    }, 300);
  }

  if (formAdd[0].value.trim() !== "" && formAdd[1].value !== "00:00") {
    const task = new TaskToCreate(
      e.target[0].value,
      calculateRealTime(),
      formAdd[3].value.trim(),
      formAdd[2].value
    );

    const req = await fetch("http://localhost:3000/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const res = await req.json();

    formAdd[0].value = "";
    formAdd[1].value = "00:00";
    formAdd[2].value = "0";
    formAdd[3].value = "";

    modalAdd.style.display = "none";

    e.target[4].textContent = "Cancelar";

    if (res.code == 200) {
      task.createTask();
    }
  }
});

formAdd[0].addEventListener("keyup", (e) => {
  if (e.target.value.trim() !== "" && formAdd[1].value !== "00:00") {
    formAdd[4].textContent = "Crear";
  } else if (e.target.value.trim() == "") {
    formAdd[4].textContent = "Cancelar";
  }
});

formAdd[1].addEventListener("change", (e) => {
  if (e.target.value !== "00:00" && formAdd[0].value.trim() !== "") {
    formAdd[4].textContent = "Crear";
  } else if (e.target.value == "00:00") {
    formAdd[4].textContent = "Cancelar";
  }
});

function calculateRealTime() {
  const time = formAdd[1].value.split(":");

  const hour = parseInt(time[0]);
  const minuts = time[1];

  if (hour <= 12) {
    return `${hour}:${minuts} AM`;
  } else if (hour > 12) {
    return `${hour - 12}:${minuts} PM`;
  }
}

const cleanMain = async () => {
  for (let i = 0; i < main.children.length; i++) {
    main.removeChild(main.children[i]);
  }

  const req = await fetch("http://localhost:3000/get-all");

  const res = await req.json();

  for (let i = 0; i < res.tasks.length; i++) {
    const task = new TaskToCreate(
      res.tasks[i].name,
      res.tasks[i].time,
      res.tasks[i].description,
      res.tasks[i].priority,
      res.tasks[i].completed,
      res.tasks[i].createdAt,
      res.tasks[i].updatedAt,
      res.tasks[i].id
    );

    task.createTask();
  }
};

formUpdate.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (formUpdate[5].textContent.toLowerCase() == "cancelar") {
    modalUpdate.style.animation = "hide_update 0.3s linear";
    setTimeout(() => {
      modalUpdate.style.display = "none";
    }, 300);
  }

  if (formUpdate[5].textContent.toLowerCase() == "editar") {
    if (
      taskCompare.name !== formUpdate[0].value ||
      taskCompare.time !== formUpdate[1].value ||
      taskCompare.completed !== formUpdate[2].value ||
      taskCompare.priority !== formUpdate[3].value ||
      taskCompare.description !== formUpdate[4].value
    ) {
      const taskUpdate = new TaskToUpdate(
        formUpdate[0].value.trim(),
        calculateTimeToUpdate(),
        formUpdate[2].value.trim(),
        formUpdate[3].value.trim(),
        formUpdate[4].value.trim(),
        taskCompare.getId()
      );

      const req = await fetch("http://localhost:3000/update", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(taskUpdate),
      });

      const res = await req.json();

      if (res.code == 200) {
        updateTask(
          formUpdate[0].value,
          calculateRealTimeToUpdate(),
          `prioridad: ${formUpdate[3].value}`,
          formUpdate[2].value
        );
      }

      modalUpdate.style.animation = "hide_update 0.3s linear";
      setTimeout(() => {
        modalUpdate.style.display = "none";
      }, 300);
      formUpdate[5].value = "Cancelar";
    } else {
      formUpdate[5].textContent = "Cancelar";
      console.log("no ha sido editado ningun campo");
    }
  }
});

formUpdate[0].addEventListener("input", (e) => {
  if (e.target.value === taskCompare.name) {
    formUpdate[5].textContent = "Cancelar";
  } else if (e.target.value !== "") {
    formUpdate[5].textContent = "Editar";
  } else {
    formUpdate[5].textContent = "Cancelar";
  }
});

formUpdate[1].addEventListener("input", (e) => {
  if (e.target.value === taskCompare.time) {
    formUpdate[5].textContent = "Cancelar";
  } else if (e.target.value !== "") {
    formUpdate[5].textContent = "Editar";
    return;
  } else formUpdate[5].textContent = "Cancelar";
});

formUpdate[2].addEventListener("input", (e) => {
  if (e.target.value === taskCompare.completed) {
    formUpdate[5].textContent = "Cancelar";
  } else if (e.target.value !== "") {
    formUpdate[5].textContent = "Editar";
    return;
  } else formUpdate[5].textContent = "Cancelar";
});

formUpdate[3].addEventListener("input", (e) => {
  if (e.target.value === taskCompare.priority) {
    formUpdate[5].textContent = "Cancelar";
  } else if (e.target.value !== "") {
    formUpdate[5].textContent = "Editar";
    return;
  } else formUpdate[5].textContent = "Cancelar";
});

formUpdate[4].addEventListener("input", (e) => {
  if (e.target.value === taskCompare.description) {
    formUpdate[5].textContent = "Cancelar";
  } else if (e.target.value !== "") {
    formUpdate[5].textContent = "Editar";
    return;
  } else formUpdate[5].textContent = "Cancelar";
});

function calculateTimeToUpdate() {
  const time = formUpdate[1].value.split();
  const hour = parseInt(time[0].split(":")[0]);
  const minuts = time[0].split(":")[1];

  if (hour <= 12) {
    return `0${hour}:${minuts} AM`;
  } else if (hour > 12) {
    return `0${hour - 12}:${minuts} PM`;
  }
}

function updateTask(name, time, priority, completed) {
  const task = document.getElementById(taskCompare.getId());
  const sec1 = task.children[0].children;

  sec1[0].textContent = name;
  sec1[1].textContent = time;
  sec1[2].textContent = priority;
  sec1[3].textContent = completed;
  sec1[5].textContent = `actualizada: ${fecha.getDay()}/${fecha.getMonth()}/${fecha.getFullYear()}`;
}

function calculateRealTimeToUpdate() {
  const time = formUpdate[1].value.split(":");
  const hour = parseInt(time[0]);
  const minuts = time[1];

  if (hour <= 12) {
    return `${hour}:${minuts} AM`;
  } else if (hour > 12) {
    return `${hour - 12}:${minuts} PM`;
  }
}
