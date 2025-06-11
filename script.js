const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load saved tasks on page load
window.onload = function() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => renderTask(task.text, task.completed));
};

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  renderTask(taskText, false);
  saveTasks();
  taskInput.value = "";
}

function renderTask(text, isCompleted) {
  const li = document.createElement("li");
  li.textContent = text;

  if (isCompleted) {
    li.classList.add("completed");
  }

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = function(e) {
    e.stopPropagation(); // Prevent complete toggle
    li.remove();
    saveTasks();
  };

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach(li => {
    tasks.push({ text: li.firstChild.textContent.trim(), completed: li.classList.contains("completed") });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
