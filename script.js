const taskContainer = document.getElementById("tasks");
let taskArray = [];

if (localStorage.getItem("tasks") != null) {
  taskArray = JSON.parse(localStorage.getItem("tasks"));
}

let compare = (a, b) => {
  if (a.isCompleted) return 1;
  else return -1;
};

let renderTasks = () => {
  document.getElementById("tasks").innerHTML = "";

  taskArray.sort(compare);

  taskArray.forEach((task) => {
    const singleTaskContainer = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const check = document.createElement("input");
    check.type = "checkbox";
    check.dataset.id = task.date;
    check.className = "notCompleted";
    deleteBtn.id = "deleteBtn"
    deleteBtn.dataset.id = task.date;

    document.getElementById("tasks").appendChild(singleTaskContainer);

    singleTaskContainer.textContent = task["text"];
    singleTaskContainer.appendChild(check);
    singleTaskContainer.appendChild(deleteBtn);

    if (task["isCompleted"]) {
      singleTaskContainer.className = "completed";
      check.checked = true;
    } else {}
  });
};

renderTasks();

document.getElementById("addBtn").addEventListener("click", () => {
  taskArray.push({
    date: Date.now(),
    text: document.getElementById("taskInput").value,
    isCompleted: false,
  });
  localStorage.setItem("tasks", JSON.stringify(taskArray));
  renderTasks();
});

taskContainer.addEventListener("click", (event) => {
  if(event.target.type == "checkbox"){
    const toChange = taskArray.find(({ date }) => date == event.target.dataset.id);
    if(toChange.isCompleted) toChange.isCompleted = false
    else toChange.isCompleted = true
    renderTasks();
  }
  else if(event.target.id == "deleteBtn"){
    taskArray = taskArray.filter(({date}) => date != event.target.dataset.id)
    localStorage.setItem("tasks", JSON.stringify(taskArray));
    renderTasks();
  }
})

// Add the alert for deletion and implement style to everything, and also add a neccesity that task has to have text