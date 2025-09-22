function addTask() {
  let input = document.getElementById("taskInput");
  let taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  let li = document.createElement("li");
  li.textContent = taskText;

  // toggle complete
li.addEventListener("click", function() {
  li.classList.toggle("completed");

  // hide delete button if completed
  if (li.classList.contains("completed")) {
    deleteBtn.style.display = "none";
  } else {
    deleteBtn.style.display = "inline-block";
  }
});


  // delete button
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.onclick = function() {
    li.remove();
  };

  li.appendChild(deleteBtn);
  document.getElementById("taskList").appendChild(li);

  input.value = "";
}
