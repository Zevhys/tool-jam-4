const d = document;

let kanbanItemTemplate = `
  <div class="container">
    <span class="textbox" role="textbox" placeholder="Type here..." contenteditable>
    </span>
  </div>

  <div class="controls">
    <button class="create-item create-task">
    <i class="fa-solid fa-list-check"></i>
    </button>
  </div>
`;

d.querySelector(".create-item-note").addEventListener("click", (e) => {
  let kanbanItem = d.createElement("label");
  kanbanItem.classList.add("kanban-item");
  kanbanItem.innerHTML = kanbanItemTemplate;

  e.target.parentElement.querySelector(".kanban-item-container").appendChild(kanbanItem);

  // e.target.parentElement.querySelector(".kanban-item-container").innerHTML += kanbanItemTemplate;

  // d.querySelector("button.create-task").addEventListener("click", (_e) => {
  kanbanItem.querySelector("button.create-task").addEventListener("click", (_e) => {
    let taskItem = d.createElement("label");
    taskItem.classList.add("checkbox");
    taskItem.innerHTML = `
      <input type="checkbox">
      <i class="fa-solid fa-square-check"></i>
      <i class="fa-regular fa-square"></i>
      <input type="text" placeholder="Task item">
      <button class="task-delete">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;

    taskItem.querySelector(".task-delete").addEventListener("", () => {});

    kanbanItem.querySelector(".container").appendChild(taskItem);
    // _e.target.parentElement.parentElement.previousElementSibling.appendChild(taskItem);
  });
});
