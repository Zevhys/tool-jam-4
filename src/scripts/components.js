const d = document;

// <span class="textbox" role="textbox" placeholder="Type here..." contenteditable></span>;

let kanbanItemTemplate = `
  <div class="container">
    <h3><input class="heading" type="text" value="Title"></h3>
    <textarea class="textbox note"></textarea>
  </div>

  <details class="kanban-item-config">
    <summary>
      <i class="fa-solid fa-ellipsis"></i>
    </summary>

    <div class="controls">
      <button class="create-item toggle-heading">
        <i class="fa-solid fa-heading"></i>
      </button>

      <button class="create-item toggle-note">
        <i class="fa-solid fa-file-lines"></i>
      </button>

      <button class="create-item create-task">
        <i class="fa-solid fa-list-check"></i>
      </button>

      <div class="flex-space"></div>

      <button class="create-item delete-item">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  </details>
`;

function initializeBoard(elem) {
  const createNoteButton = elem.querySelector(".create-item-note");

  createNoteButton.addEventListener("click", () => {
    let kanbanItem = d.createElement("div");
    kanbanItem.classList.add("kanban-item");
    kanbanItem.innerHTML = kanbanItemTemplate;

    const headingComp = kanbanItem.querySelector("h3");
    const headingInp = kanbanItem.querySelector(".heading");
    const noteInp = kanbanItem.querySelector(".note");

    elem.querySelector(".kanban-item-container").appendChild(kanbanItem);

    const toggleHeadingButton = kanbanItem.querySelector(".toggle-heading");
    const toggleNoteButton = kanbanItem.querySelector(".toggle-note");
    const createTaskButton = kanbanItem.querySelector(".create-task");

    kanbanItem.querySelector(".delete-item").addEventListener("click", () => {
      kanbanItem.remove();
    });

    toggleHeadingButton.addEventListener("click", () => {
      headingComp.classList.toggle("hidden");
    });

    toggleNoteButton.addEventListener("click", () => {
      noteInp.classList.toggle("hidden");
    });

    createTaskButton.addEventListener("click", () => {
      let taskItem = d.createElement("label");
      taskItem.classList.add("checkbox");
      taskItem.innerHTML += `
      <input type="checkbox">
      <i class="fa-solid fa-square-check"></i>
      <i class="fa-regular fa-square"></i>
      <input type="text" placeholder="Task item">
      <button class="task-delete">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;

      taskItem.querySelector(".task-delete").addEventListener("click", () => {
        taskItem.remove();
      });

      kanbanItem.querySelector(".container").appendChild(taskItem);
    });
  });
}

let columns = {
  col1: {
    name: "",
    element: d.getElementById("col1"),
    titleEl: d.getElementById("col1-heading"),
  },
  col2: {
    name: "",
    element: d.getElementById("col2"),
    titleEl: d.getElementById("col2-heading"),
  },
  col3: {
    name: "",
    element: d.getElementById("col3"),
    titleEl: d.getElementById("col3-heading"),
  },
  col4: {
    name: "",
    element: d.getElementById("col4"),
    titleEl: d.getElementById("col4-heading"),
  },
};

for (const col in columns) {
  const colObj = columns[col];
  initializeBoard(colObj.element);
}
