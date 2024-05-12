import $ from "jquery";

let kanbanItemTemplate = `
  <div class="container">
    <h3><input class="heading" type="text" value="Title"></h3>
    <textarea class="textbox note"></textarea>
  </div>

  <div class="kanban-item-config">
    <div class="controls-general">
      <button class="item-config more-config">
        <i class="fa-solid fa-ellipsis"></i>
      </button>

      <div class="flex-space"></div>

      <button class="item-config move-up hidden">
        <i class="fa-solid fa-caret-up"></i>
      </button>

      <button class="item-config move-down hidden">
        <i class="fa-solid fa-caret-down"></i>
      </button>
    </div>

    <div class="controls hidden">
      <button class="item-config toggle-heading">
        <i class="fa-solid fa-heading"></i>
      </button>

      <button class="item-config toggle-note">
        <i class="fa-solid fa-file-lines"></i>
      </button>

      <button class="item-config create-task">
        <i class="fa-solid fa-list-check"></i>
      </button>

      <div class="flex-space"></div>

      <button class="item-config delete-item">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  </div>
`;

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

function initializeBoard(elem) {
  const createNoteButton = elem.find(".create-item-note");

  createNoteButton.on("click", () => {
    addKanbanItem(createItemGeneral({}, elem), elem);
  });
}

function addKanbanItem(item, board) {
  const kanbanContainer = board.find(".kanban-item-container");

  kanbanContainer.append(item);

  kanbanContainer.on("DOMNodeInserted DOMNodeRemoved", () => {
    kanbanContainer.children(".kanban-item").each((i, e) => {
      updateItemPositions($(e));
    })
  });
}

function createItemGeneral(data, board) {
  let kanbanItem = $(`
    <div class='kanban-item'>
      ${kanbanItemTemplate}
    </div>
  `);

  const headingComp = kanbanItem.find("h3");
  const headingInp = kanbanItem.find(".heading");
  const noteInp = kanbanItem.find(".note");

  const toggleHeadingButton = kanbanItem.find(".toggle-heading");
  const toggleNoteButton = kanbanItem.find(".toggle-note");
  const createTaskButton = kanbanItem.find(".create-task");

  kanbanItem.find(".delete-item").on("click", () => {
    kanbanItem.remove();
  });

  toggleHeadingButton.on("click", () => {
    headingComp.toggleClass("hidden");
  });

  toggleNoteButton.on("click", () => {
    noteInp.toggleClass("hidden");
  });

  createTaskButton.on("click", () => {
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

    taskItem.find(".task-delete").on("click", () => {
      taskItem.remove();
    });

    kanbanItem.find(".container").append(taskItem);
  });

  const moreControlsContainer = kanbanItem.find("div.controls");
  const toggleMoreControls = kanbanItem.find("button.item-config.more-config");

  toggleMoreControls.on("click", () => {
    moreControlsContainer.toggleClass("hidden");
  });

  const btnMoveUp = kanbanItem.find(".move-up");
  const btnMoveDown = kanbanItem.find(".move-down");

  btnMoveUp.on("click", () => {
    kanbanItem.insertBefore(kanbanItem.prev()); 
  });

  btnMoveDown.on("click", () => {
    kanbanItem.insertAfter(kanbanItem.next()); 
  });

  return kanbanItem;
}

function updateItemPositions(item) {
  item.find(".move-up").toggleClass("hidden", item.prev().length == 0);
  item.find(".move-down").toggleClass("hidden", item.next().length == 0);
}