const d = document;
import $ from "jquery";

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
  const createNoteButton = elem.find(".create-item-note");

  createNoteButton.bind("click", () => {
    let kanbanItem = $(`<div class='kanban-item'>${kanbanItemTemplate}</div>`);
    // kanbanItem.addClass("kanban-item");
    // kanbanItem.innerHTML = kanbanItemTemplate;

    const headingComp = kanbanItem.find("h3");
    const headingInp = kanbanItem.find(".heading");
    const noteInp = kanbanItem.find(".note");

    elem.find(".kanban-item-container").append(kanbanItem);

    const toggleHeadingButton = kanbanItem.find(".toggle-heading");
    const toggleNoteButton = kanbanItem.find(".toggle-note");
    const createTaskButton = kanbanItem.find(".create-task");

    kanbanItem.find(".delete-item").bind("click", () => {
      kanbanItem.remove();
    });

    toggleHeadingButton.bind("click", () => {
      headingComp.toggleClass("hidden");
    });

    toggleNoteButton.bind("click", () => {
      noteInp.toggleClass("hidden");
    });

    createTaskButton.bind("click", () => {
      let taskItem = $(`
        <label class='checkbox'>
          <input type="checkbox">
          <i class="fa-solid fa-square-check"></i>
          <i class="fa-regular fa-square"></i>
          <input type="text" placeholder="Task item">
          <button class="task-delete">
            <i class="fa-solid fa-trash"></i>
          </button>
        </label>
      `);

      taskItem.find(".task-delete").bind("click", () => {
        taskItem.remove();
      });

      kanbanItem.find(".container").append(taskItem);
    });
  });
}

let columns = {
  col1: {
    name: "",
    element: $("#col1"),
    titleEl: $("#col1-heading"),
  },
  col2: {
    name: "",
    element: $("#col2"),
    titleEl: $("#col2-heading"),
  },
  col3: {
    name: "",
    element: $("#col3"),
    titleEl: $("#col3-heading"),
  },
  col4: {
    name: "",
    element: $("#col4"),
    titleEl: $("#col4-heading"),
  },
};

for (const col in columns) {
  const colObj = columns[col];
  initializeBoard(colObj.element);
}
