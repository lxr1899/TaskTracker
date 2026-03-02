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
    check.className = "notCompleted";
    deleteBtn.id = "deleteBtn"

    document.getElementById("tasks").appendChild(singleTaskContainer);

    singleTaskContainer.textContent = task["text"];
    singleTaskContainer.appendChild(check);
    singleTaskContainer.appendChild(deleteBtn);

    if (task["isCompleted"]) {
      singleTaskContainer.className = "completed";
      check.checked = true;
    } else {
      console.log("not completed");
    }
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
    // the code here will change the property of the task
  }
  else if(event.target.id == "deleteBtn"){
    // the code here will delete the task completely
  }
})

// next time get the ids(date) to every task and based on them do the code of deletion andd changing the completion status