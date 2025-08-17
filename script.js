const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");


document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  createTaskElement(taskText);

  saveTask(taskText);
  taskInput.value = "";
}


function createTaskElement(text, completed = false) {
  const li = document.createElement("li");
  li.className = "task";
  if (completed) li.classList.add("completed");

  li.innerHTML = `
    <span>${text}</span>
    <div>
      <button onclick="toggleComplete(this)">✔</button>
      <button class="deleteBtn" onclick="deleteTask(this)">✖</button>
    </div>
  `;

  taskList.appendChild(li);
}


function toggleComplete(button) {
  const li = button.closest("li");
  li.classList.toggle("completed");
  updateStorage();
}


function deleteTask(button) {
  const li = button.closest("li");
  li.remove();
  updateStorage();
}


function saveTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function updateStorage() {
  let tasks = [];
  document.querySelectorAll("#taskList .task").forEach(li => {
    tasks.push({
      text: li.querySelector("span").innerText,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(t => createTaskElement(t.text, t.completed));
}
