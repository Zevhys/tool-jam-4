import $ from "jquery";
import { templateItemGeneral, templateCheckbox } from "./storage";

const moveItemMenu = $("#move-item-menu");
let moveItemCurrTarget;

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

      <button class="item-config move-item">
        <i class="fa-solid fa-up-down-left-right"></i>
      </button>

      <div class="vseparator"></div>

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

export let columns = {
  col1: {
    nameDefault: "💡 Planned",
    element: $("#col1"),
    titleEl: $("#col1-heading"),
  },
  col2: {
    nameDefault: "🔧 In Progress",
    element: $("#col2"),
    titleEl: $("#col2-heading"),
  },
  col3: {
    nameDefault: "🧪 Testing",
    element: $("#col3"),
    titleEl: $("#col3-heading"),
  },
  col4: {
    nameDefault: "📌 Finished",
    element: $("#col4"),
    titleEl: $("#col4-heading"),
  },
};

for (const col in columns) {
  const colObj = columns[col];
  initializeBoard(colObj.element);

  const moveMenu = $(`#move-to-${col}`);

  moveMenu.text(`Move to ${colObj.titleEl.val()}`);

  colObj.titleEl.on("input", () => {
    colObj.titleEl.attr("data-title-val", colObj.titleEl.val());
    moveMenu.text(`Move to ${colObj.titleEl.val()}`);
  });

  moveMenu.on("click", () => {
    moveItem(moveItemCurrTarget, colObj.element);
    moveItemMenu.toggleClass("hidden", true);
  });
}

function initializeBoard(elem) {
  const createNoteButton = elem.find(".create-item-note");
  const headingInp = elem.find("input[id*='heading']");

  headingInp.attr("data-title-val", headingInp.val());

  headingInp.on("input", () => {
    headingInp.attr("data-title-val", headingInp.val());
  });

  createNoteButton.on("click", () => {
    addKanbanItem(createItemGeneral(templateItemGeneral, elem), elem);
  });
}

export function addKanbanItem(item, board) {
  const kanbanContainer = board.find(".kanban-item-container");

  kanbanContainer.append(item);
  updateBoardItemsPositions(board);
}

export function createItemGeneral(data, board) {
  let kanbanItem = $(`
    <div class='kanban-item'>
      ${kanbanItemTemplate}
    </div>
  `);

  const headingComp = kanbanItem.find("h3");
  headingComp.toggleClass("hidden", !data.visibility.heading);

  const headingInp = kanbanItem.find(".heading");
  headingInp.val(data.title);

  const noteInp = kanbanItem.find(".note");
  noteInp.toggleClass("hidden", !data.visibility.desc);
  noteInp.val(data.description);
  noteInp.attr("style", data.descStyle);

  const toggleHeadingButton = kanbanItem.find(".toggle-heading");
  const toggleNoteButton = kanbanItem.find(".toggle-note");
  const createTaskButton = kanbanItem.find(".create-task");

  kanbanItem.find(".delete-item").on("click", () => {
    kanbanItem.remove();
    updateBoardItemsPositions(board);
  });

  toggleHeadingButton.on("click", () => {
    headingComp.toggleClass("hidden");
  });

  toggleNoteButton.on("click", () => {
    noteInp.toggleClass("hidden");
  });

  createTaskButton.on("click", () => {
    kanbanItem.find(".container").append(createCheckbox());
  });

  data.checkboxes.forEach((e) => {
    kanbanItem.find(".container").append(createCheckbox(e.name, e.checked));
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
    updateBoardItemsPositions(board);
  });

  btnMoveDown.on("click", () => {
    kanbanItem.insertAfter(kanbanItem.next());
    updateBoardItemsPositions(board);
  });

  const btnMoveItem = kanbanItem.find(".move-item");

  btnMoveItem.on("click", () => {
    if (moveItemMenu.hasClass("hidden")) {
      moveItemCurrTarget = null;
    }

    moveItemMenu.toggleClass("hidden", moveItemCurrTarget === kanbanItem);
    moveItemCurrTarget = kanbanItem;

    const left = btnMoveItem.position().left;
    const top = btnMoveItem.position().top + btnMoveItem.outerHeight();

    moveItemMenu.css("left", `${left}px`);
    moveItemMenu.css("top", `${top}px`);
  });

  return kanbanItem;
}

function createCheckbox(name = "", checked = false) {
  let taskItem = $(`
    <label class='checkbox'>
      <input type="checkbox" ${ checked ? "checked" : "" }>
      <i class="fa-solid fa-square-check"></i>
      <i class="fa-regular fa-square"></i>
      <input type="text" placeholder="Task item" value="${name}">
      <button class="task-delete">
        <i class="fa-solid fa-trash"></i>
      </button>
    </label>
  `);

  taskItem.find(".task-delete").on("click", () => {
    taskItem.remove();
  });

  return taskItem;
}

function updateItemPositions(item) {
  item.find(".move-up").toggleClass("hidden", item.prev().length == 0);
  item.find(".move-down").toggleClass("hidden", item.next().length == 0);
}

function updateBoardItemsPositions(board) {
  board.find(".kanban-item-container").children(".kanban-item").each((i, e) => {
    updateItemPositions($(e));
  });
}

function moveItem(item, board) {
  board.find(".kanban-item-container").append(item);
}