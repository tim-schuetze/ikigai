let newTask = document.createElement("div");
newTask.className = "newTask";
newTask.id = "newTask";

let barInput = document.createElement("p");
barInput.className = "barInput";
barInput.id = "barInput";
barInput.textContent = document.getElementById("inputBar").value;

document.getElementById("addTask").onclick = () => {
  if((document.getElementById("inputBar").value.length !== 0) || (document.getElementById("inputBar").value !== " ")){
  document.getElementById("taskList").appendChild(newTask);
  }
}