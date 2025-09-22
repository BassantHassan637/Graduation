document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please write a task first!");
        return;
    }

    const li = document.createElement("li");
    
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    deleteBtn.onclick = function(event) {
        event.stopPropagation();
        li.remove();
        saveTasks();
    };

    li.onclick = function() {
        li.classList.toggle("completed");
        saveTasks();
    };

    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = "";

    saveTasks();
}

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(task => {
            const li = document.createElement("li");
            const taskSpan = document.createElement("span");
            taskSpan.textContent = task.text;

            if (task.completed) {
                li.classList.add("completed");
            }

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "delete-btn";

            deleteBtn.onclick = function(event) {
                event.stopPropagation();
                li.remove();
                saveTasks();
            };

            li.onclick = function() {
                li.classList.toggle("completed");
                saveTasks();
            };

            li.appendChild(taskSpan);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }
}
